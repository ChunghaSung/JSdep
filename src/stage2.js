var falafel = require('falafel');
var fs = require('fs');
var ast = require('./js_wala/common/lib/ast.js');
var sets = require('./js_wala/common/lib/sets.js');


function iterCFG(nd, f) {
    function rec(nd) {
        iterCFG(nd, f);
    }
    
    if (!nd) {
        return;
    }
    switch(nd.type) {
        case 'Program':
            f(nd.attr.fakeRoot);
            nd.body.forEach(rec);
            break;
        // MODIFIED by CH
        case 'FunctionExpression':
        case 'FunctionDeclaration':
            f(nd);
            f(nd.attr.fakeRoot);
            rec(nd.body);
            break;

        case 'EmptyStatement':
        case 'DebuggerStatement':
        case 'VariableDeclaration':
        case 'ReturnStatement':
        case 'BreakStatement':
        case 'ThrowStatement':
            f(nd);
            break;

        case 'ExpressionStatement':
            f(nd);
            break;

        case 'IfStatement':
            f(nd);
            f(nd.test);
            rec(nd.consequent);
            rec(nd.alternate);
            break;

        case 'WhileStatement':
            f(nd);
            f(nd.test);
            rec(nd.body);
            break;
        case 'ForInStatement':
            f(nd);
            rec(nd.body);
            break;

        case 'LabeledStatement':
            f(nd);
            rec(nd.body);
            break;

        case 'TryStatement':
            f(nd);
            rec(nd.block);
            if (nd.handlers && nd.handlers[0]) {
                rec(nd.handlers[0].body);
            }
            if (nd.finalizer) {
                rec(nd.finalizer);
            }
            break;

        case 'BlockStatement':
            for (var i=0; i<nd.body.length; ++i) {
                rec(nd.body[i]);
            }
            break;
        case 'BinaryExpression':
            f(nd);
            break;

        case 'ForStatement':
            f(nd);
            f(nd.init);
            f(nd.test);
            f(nd.update);
            rec(nd.body);
            break;
        case 'Identifier':
            f(nd);
            break;
        default:
            console.log(nd);
            throw new Error("unexpected statement of type " + nd.type);
    }
}

/********************************
  Functions for Statement debug
*********************************/
/*
function dumpNode(nd) {
    "use strict";
    if (!nd) {
        return "<null>";
    }
    var pos = ast.getPosition(nd);
    if (nd.type === 'FunctionDeclaration') {
        return nd.type + ": function " + nd.id.source() + " at " + pos.start_line + ':' + pos.end_offset; 

    }
    if (nd.type === 'Program') {
        return "[ " + nd.type + " ]";
    }
    if (nd.source === undefined) {
        return nd.type + " at " + pos.start_line + ':' + pos.end_offset;
    } else {
        return nd.type + " : " + nd.source() + " at " + pos.start_line + ':' + pos.end_offset;
    }
}
*/

function dumpNodeHash(nd) {
    "use strict";
    if (!nd) {
        return "<null>";
    }
    var pos = ast.getPosition(nd);
    var hash = ast.getAttribute(nd, 'hash');
    if (nd.type === 'FunctionDeclaration') {
        return hash + " // " + nd.type + ": function " + nd.id.source() + " at " + pos.start_line + ':' + pos.end_offset; 

    }
    if (nd.type === 'Program') {
        return "[ " + nd.type + " ]";
    }
    if (nd.source === undefined) {
        return hash + " // " + nd.type + " at " + pos.start_line + ':' + pos.end_offset;
    } else {
        return hash + " // " + nd.type + " : " + nd.source() + " at " + pos.start_line + ':' + pos.end_offset;
    }
}

function dumpHash(nd) {
    "use strict";
    if (!nd) {
        return "<null>";
    }
    var hash = ast.getAttribute(nd, 'hash');
    if (nd.type === 'FunctionDeclaration') {
        return hash; 

    }
    if (nd.type === 'Program') {
        return "[ " + nd.type + " ]";
    }
    return hash;
}

var debugStmtMsg = "";
function debugStmtSave(nd)
{
    "use strict";
    var succs = ast.getAttribute(nd, 'succ');
    var idom = ast.getAttribute(nd, 'idom');
    var ipdom = ast.getAttribute(nd, 'ipdom');
    var pred = ast.getAttribute(nd, 'pred');
    debugStmtMsg = debugStmtMsg + "\n---------------------------------------------------------";
    debugStmtMsg = debugStmtMsg + "\n" + dumpNodeHash(nd);
    debugStmtMsg = debugStmtMsg + "\n" + "Pred: " + (pred ? sets.map(pred, dumpHash).join(', '): "none");
    debugStmtMsg = debugStmtMsg + "\n" + "Succ: " + (succs ? sets.map(succs, dumpHash).join(', '): "none");
    debugStmtMsg = debugStmtMsg + "\n" + "IDOM: " + (idom ? dumpHash(idom): "none");
    debugStmtMsg = debugStmtMsg + "\n" + "IPDOM: " + (ipdom ? dumpHash(ipdom): "none");
}

function debugStmtPrint()
{
    "use strict";
    var fd = fs.openSync('stmtDebug.txt', 'w+');
    fs.writeSync(fd, debugStmtMsg);
}

function getAbsPos(nd)
{
    "use strict";
    var pos = ast.getPosition(nd);
    if (nd.type === 'Entry') {
        return pos.start_line + ':0'; 
    }
    return pos.start_line + ':' + pos.end_offset;
}



/***************************
  Inverse immediate post dominate relationship object.
****************************/
var inverseIpdom = {};
var inverseIpdomObj = {
    insert: function (nd) {
        "use strict";
        var ipdom = ast.getAttribute(nd, 'ipdom');
        if (ipdom !== undefined) {
            var ipdomPos = getAbsPos(ipdom);
            var ipdomHash = hashStmtObj.get(ipdomPos);
            var ndPos = getAbsPos(nd);
            var ndHash = hashStmtObj.get(ndPos);
            if(inverseIpdom[ipdomHash] === undefined) {
                inverseIpdom[ipdomHash] = [];
                inverseIpdom[ipdomHash][0] = ndHash; 
            } else {
                inverseIpdom[ipdomHash][inverseIpdom[ipdomHash].length] = ndHash;
            }
        }
    },
    get: function (x) {
        "use strict";
        // x is hash value
        // ipostdom(z) = x;
        // returns the array of z
        return inverseIpdom[x];
    }
};

/************************************************
  Hash object for hash value of each statement.
*************************************************/
var hashStmtToNode = {};
var hashStmt = {};
var hashStmtCnt = 0;
var hashStmtObj = {
    check: function (pos) {
        "use strict";
        if (hashStmt[pos] === undefined) {
            return false;
        } else {
            return true;
        }
    },
    insert: function (nd) {
        "use strict";
        var pos = getAbsPos(nd);
        var bin = hashStmtCnt.toString(16);
        while (bin.length !== 4) {
            bin = '0'.concat(bin);
        }
        bin = '#x' + bin;
        hashStmt[pos] = bin;
        hashStmtCnt++;
        hashStmtToNode[bin] = nd;
    },
    get: function (pos) {
        "use strict";
        return hashStmt[pos];
    },
    getNode: function (hash) {
        "use strict";
        return hashStmtToNode[hash];
    }
};

function setHashStmt(nd)
{
    "use strict";
    if (nd.type === 'Entry') {
        ast.setAttribute(nd, 'hash', "#xffffffff");
        return;
    }
    var absPos = getAbsPos(nd);
    var hasVal;
    if (hashStmtObj.check(absPos)) {
        hasVal = hashStmtObj.get(absPos);
        throw new Error("Conflict Position!");
    } else {
        hashStmtObj.insert(nd);
        hasVal = hashStmtObj.get(absPos);
        ast.setAttribute(nd, 'hash', hasVal);
    }
}

/************************************************
  Hash object for hash value of variables.
*************************************************/
var hashVarToName = {};
var hashVar = {};
var hashVarCnt = 0;
var hashVarObj = {
    check: function (name) {
        "use strict";
        if (hashVar[name] === undefined) {
            return false;
        } else {
            return true;
        }
    },
    insert: function (name) {
        "use strict";
        var bin = hashVarCnt.toString(16);
        while (bin.length !== 4) {
            bin = '0'.concat(bin);
        }
        bin = '#x' + bin;
        hashVar[name] = bin;
        hashVarCnt++;
        hashVarToName[bin] = name;
    },
    get: function (name) {
        "use strict";
        return hashVar[name];
    },
    getName: function (hash) {
        "use strict";
        return hashVarToName[hash];
    }
};

function getHashVar(name)
{
    "use strict";
    var hash;
    if (!hashVarObj.check(name)) {
        hashVarObj.insert(name);
    } 
    hash = hashVarObj.get(name);
    return hash;
}

/*************************************************
    Functions for printing flow and stmt facts 
**************************************************/
/*
var flowFacts = "";
function printFlow(nd)
{
    "use strict";
    if (nd.type === 'FunctionDeclaration') {
        return;
    }
    var succs = ast.getAttribute(nd, 'succ');
    var parentHash = ast.getAttribute(nd, 'hash');
    var childHash;
    var temp;
    //console.log(nd);
    if (succs.length === undefined) {
        temp = skipFunctionDeclaration(succs);
        childHash = ast.getAttribute(temp, 'hash');
        if (childHash !== undefined) {
            //console.log("(rule (flow " + parentHash + " " + childHash +" ))");
            flowFacts = flowFacts + "\n" + "(rule (flow " + parentHash + " " + childHash +" ))";
        }
    } else {
        for (var i=0; i<succs.length; i++) {
            temp = skipFunctionDeclaration(succs[i]);
            childHash = ast.getAttribute(temp, 'hash');
            if (childHash !== undefined) {
                //console.log("(rule (flow " + parentHash + " " + childHash +" ))");
                flowFacts = flowFacts + "\n" + "(rule (flow " + parentHash + " " + childHash +" ))";
            }
        }
    }
}
*/


/*************************************************
    Functions for reading general rules 
     and making smt2 file to be queried.
**************************************************/
function printHashVarAll()
{
    "use strict";
    var debugMsg = "";
    for (var i in hashVar) {
        debugMsg = debugMsg + "\n" + hashVar[i] + ":" + i;
    }
    var fd = fs.openSync('hashVarDebug.txt', 'w+');
    fs.writeSync(fd, debugMsg);
}
var smt2fd;
function smt2FileWrite(content)
{
    "use strict";
    fs.writeSync(smt2fd, content+'\n');
}

var numCons = 0;

function consFileWrite()
{
    "use strict";
    var fd2 = fs.openSync('numConstraints.txt', 'w+');
    fs.writeSync(fd2, numCons);
    fs.closeSync(fd2);
}

function makeGeneralRule()
{
    "use strict";
    var buffer = fs.readFileSync('../z3_rules/general_rule_z3.smt2').toString(); 
    smt2fd = fs.openSync('../z3_result.smt2', 'w+');
    smt2FileWrite(buffer);
}

function addQuery()
{
    "use strict";
    var buffer = fs.readFileSync('../z3_rules/query_z3.smt2').toString(); 
    smt2FileWrite(buffer);
}

/***************************
  Main Traverse
  1. Set Hash value for each statement.
  2. Save inverse immediate post dominate relationship.
  3. Build control dependency construction.
****************************/
function printStmt(nd)
{
    "use strict";
    var hash = ast.getAttribute(nd, 'hash');
    var funcRange;
    if (nd.type === 'FunctionDeclaration') {
        funcRange = "O_" + nd.parent.funcRange;
    } else {
        funcRange = "O_" + nd.funcRange;
    }
    console.log("(rule (Stmt " + hash + " " + funcRange + " ))");
    return "(rule (Stmt " + hash + " " + getHashVar(funcRange) +" ))";
}


function updateSt(origin, add)
{
    "use strict";
    var rtSt = origin; 
    if (add === undefined) {
        return rtSt;
    }
    if (add.length !== 0) {
        if (rtSt.length === 0) {
            rtSt = add;
        } else {
            rtSt = origin + "\n" + add;
        }
    }
    return rtSt;
}

function getZ3Num(n)
{
    "use strict";
    var bin = n.toString(16);
    while (bin.length !== 4) {
        bin = '0'.concat(bin);
    }
    bin = '#x' + bin;
    return bin;
}

var nativeCallList = ['confirm', 'alert', 'console.log', 'indexOf', 'toString', 'Math.pow', 'Math.cos', 'Math.sin', 'Math.sqrt'];
function checkNativeCalls(nd) 
{
    "use strict";
    var callee = nd.callee;
    var src;
    src = callee.source();
    if (nativeCallList.indexOf(src) !== -1) {
        return true;
    }
    if (callee.type === 'MemberExpression') {
        src = callee.property.source();
        if (nativeCallList.indexOf(src) !== -1) {
            return true;
        }
    }
    return false;
}

var hashCnt = 0;
var timer = false;
var DomReadList = ['getAttribute', 'getContext'];
var DomWriteList = ['lineTo', 'closePath', 'fill', 'stroke', 'remove', 'removeClass', 'html', 'addClass', 'setAttribute', 'appendChild', 'removeChild', 'append', 'clearRect'];
function checkCallExpression(left, right, hashPos)
{
    "use strict";
    var rtSt = "", rtDebugSt = "";
    var callee = right.callee;
    var o_name;
    var src, varName, name;
    var eventType;
    if (left !== null && checkNativeCalls(right)) {
        for (var i in right.arguments) {
            var temp = allAssignment(left, right.arguments[i], hashPos);
            rtSt = updateSt(rtSt, temp);
        }
        return {
            "rtSt": rtSt,
            "rtDebugSt": rtDebugSt
        };
    }
    // dom reference check
    // document.getElementById('b1') => dom(b1);
    if (callee.type === 'MemberExpression' && left !== null && callee.property.source() === 'getElementById') {
        if (right.arguments[0].type === 'Literal') {
            src = right.arguments[0].value;
            o_name = "O_" + src;
            varName = left.source();
            // Dom(name + o_name)
            rtSt = updateSt(rtSt, "(rule (Dom " + getHashVar(src) + " " + getHashVar(o_name) + " ))");
            numCons++;
            rtDebugSt = updateSt(rtDebugSt, "Dom(" + src + " " + o_name + ")");
            // Assign(var name)
            rtSt = updateSt(rtSt, "(rule (Assign " + getHashVar(varName) + " " + getHashVar(src) + " " + hashPos + " ))");
            numCons++;
            rtDebugSt = updateSt(rtDebugSt, "Assign(" + varName+" "+src+ " " + hashPos + ")");
            return {
                "rtSt": rtSt,
                "rtDebugSt": rtDebugSt
            };

        } else {
            //throw new Error("I have to cover Identifier of Domref");
        }
    }

    // dom install check
    // object.addeventListener
    if (callee.type === 'MemberExpression' && callee.property.source() === 'addEventListener') {
        var object = callee.object.source();
        eventType = right.arguments[0].value;
        var value = right.arguments[1].source();
        rtSt = updateSt(rtSt, '(rule (dom-install ' + getHashVar(object) + ' ' + getHashVar(eventType) + ' ' + getHashVar(value) + ' ' + hashPos + ' ))');
        numCons++;
        rtDebugSt = updateSt(rtDebugSt, '(rule (dom-install  ' + object + ' ' + eventType + ' ' + value + ' ' + hashPos + ' ))');
        console.log(rtDebugSt);
        return {
            "rtSt": rtSt,
            "rtDebugSt": rtDebugSt
        };
    }

    // dom write check
    var domName;
    if (callee.type === 'MemberExpression') {
        src = callee.property.source();
        if (DomWriteList.indexOf(src) !== -1) {
            domName = callee.object.source(); 
            o_name = "O_" + domName;
            rtSt = updateSt(rtSt, "(rule (DomWrite "+getHashVar(domName)+" "+hashPos+" ))");
            numCons++;
            rtDebugSt = updateSt(rtDebugSt, "DomWrite(" + domName + " " + hashPos+ ")");
        }
        return {
            "rtSt": rtSt,
            "rtDebugSt": rtDebugSt
        };
    }

    // dom read check
    if (callee.type === 'MemberExpression') {
        src = callee.property.source();
        if (DomReadList.indexOf(src) !== -1) {
            domName = callee.object.source(); 
            rtSt = updateSt(rtSt, "(rule (DomRead " + getHashVar(domName) + " " + hashPos + " ))");
            numCons++;
            rtDebugSt = updateSt(rtDebugSt, "DomRead(" + domName + hashPos + ")");
            rtSt = updateSt(rtSt, "(rule (Assign "+getHashVar(left.source())+" "+getHashVar(domName)+ " " + hashPos + " ))");
            numCons++;
            rtDebugSt = updateSt(rtDebugSt, "Assign(" + left.source() + " " + hashPos + ")");
        }
        return {
            "rtSt": rtSt,
            "rtDebugSt": rtDebugSt
        };
    }

    // TimerInput
    // setInterval(function, time), setTimeout
    // => dom-install (timer_t, timerinput, function, hashPos) 
    if (callee.source() === 'setInterval' || callee.source() === 'setTimeout') {
        var eventFunc = "timer_t";
        eventType = "timerinput";
        var func = right.arguments[0].source();
        if (!timer) {
            var dom = "O_timerInput";
            timer = true;
            // Fact: Dom(timerinput O_timerInput)
            rtSt = updateSt(rtSt, "(rule (Dom " + getHashVar(eventFunc) + " " + getHashVar(dom) + " ))");
            numCons++;
            rtDebugSt = updateSt(rtDebugSt, "Dom(timer_t O_timerInput)");
        }
        rtSt = updateSt(rtSt, "(rule (dom-install " + getHashVar(eventFunc) + " " + getHashVar(eventType) + " " + getHashVar(func) + " " + hashPos + " ))");
            numCons++;
        rtDebugSt = updateSt(rtDebugSt, "(rule (dom-install " + eventFunc + " " + eventType + " " + func + " " + hashPos + " ))");
    }
    
    // Others are just callexpression
    // fact: Actual(i, z, v)
    rtSt = updateSt(rtSt,"(rule (Actual"+hashPos+" #x0000 "+getHashVar(right.callee.source())+" ))");
    numCons++;
    rtDebugSt = updateSt(rtDebugSt, "Actual("+hashPos+" #x0000 "+right.callee.source()+")");
    var cnt = 1;
    for (var i in right.arguments) {
        var param = right.arguments[i];
        if (param.type === 'Literal' || param.type === 'ArrayExpression' || param.type === 'ObjectExpression') {
            o_name = hashCnt + "tempHash";
            name = hashCnt + "tempVal";
            hashCnt++;
            hashVarObj.insert(o_name);
            // Heap
            rtSt = updateSt(rtSt, "(rule (Heap " + getHashVar(name) + " " + getHashVar(o_name) + " ))");
            numCons++;
            rtDebugSt = updateSt(rtDebugSt, "Heap(" + name + " " + o_name + ")");
            // Actual
            rtSt = updateSt(rtSt, "(rule (Actual " + hashPos + " " + getZ3Num(cnt) + " " + getHashVar(name) + "))");
            numCons++;
            rtDebugSt = updateSt(rtDebugSt, "Actual(" +hashPos+" "+cnt+" "+name+ ")");
        } else {
            var paramHash = getHashVar(param.source());
            rtSt = updateSt(rtSt, "(rule (Actual " + hashPos + " " + getZ3Num(cnt) + " " + paramHash + "))");
            numCons++;
            rtDebugSt = updateSt(rtDebugSt, "Actual(" +hashPos+" "+cnt+" "+param.source()+ ")");
        }
        cnt++;
    }
    if (left !== null) {
        // fact: CallRet(i, v);
        varName = left.source();
        rtDebugSt = updateSt(rtDebugSt, "CallRet(" + hashPos + " " + varName + ")");
        rtSt = updateSt (rtSt, "(rule (CallRet "+hashPos + " " + getHashVar(varName) + " ))");
        numCons++;
    }
    return {
        "rtSt": rtSt,
        "rtDebugSt": rtDebugSt
    };
}

var eventList = {
     onclick: 'click',
     click: 'click',
     ondrag: 'drag',
     onchange: 'change',
     onmouseover: 'mouseover',
     onmousemove: 'mousemove',
     onmouseout: 'mouseout',
     onmousedown: 'mousedown',
     onmouseup: 'mouseup',
     onkeydown: 'keydown',
     ondblclick: 'dblclick',
     onresize: 'resize'
};
function domInstallCheck(left, right, hashPos)
{
    "use strict";
    var rtSt = "", rtDebugSt = "";
    // object.onclick = function
    if (left.type === 'MemberExpression') {
        if (eventList[left.property.source()] !== undefined) {
            var object = left.object.source();
            var eventType = eventList[left.property.source()];
            rtSt = updateSt(rtSt, "(rule (dom-install " + getHashVar(object)+" "+getHashVar(eventType)+" "+getHashVar(right.source())+" "+hashPos+" ))");
            numCons++;
            rtDebugSt = updateSt(rtDebugSt, "dom-install( " + object+ " " + eventType+" "+right.source()+" "+hashPos+")");
            console.log(rtDebugSt);
            return {
                "result": true,
                "rtSt": rtSt
            };
        }
    }
    console.log(rtDebugSt);
    return {
        result: false
    };
}
function normalizeExpression(nd)
{
    "use strict"; 
    var rtSt = [];
    var temp, i;
    if (nd.type === 'ObjectExpression' || nd.type === 'Identifier' || nd.type === 'Literal' || nd.type === 'MemberExpression' || nd.type === 'CallExpression') {
        rtSt.push(nd);
        return rtSt;
    }
    if (nd.type === "UnaryExpression" || nd.type === "UpdateExpression") {
        rtSt.push(nd.argument);
        return rtSt;
    } else if (nd.type === 'BinaryExpression' || nd.type === 'LogicalExpression') {
        temp = normalizeExpression(nd.left);
        for (i=0; i<temp.length; i++) {
            rtSt.push(temp[i]);
        }
        temp = normalizeExpression(nd.right);
        for (i=0; i<temp.length; i++) {
            rtSt.push(temp[i]);
        }
        return rtSt;
    } else if (nd.type === 'ThisExpression') {
        // do nothing
        return rtSt;
    } else {
        console.log(nd);
        throw new Error("Another right type??");
    }
}
var nativeList = {
    "Array": true,
    "Object": true
};
function rightSide(left, right, hashPos) 
{
    "use strict";
    var name, o_name;
    var temp;
    var rtSt = "", rtDebugSt = "";
    // for the right side
    var rightType, rightSt = "", rightDebugSt = "";
    if (right.type === 'Identifier') {
        rightType = "one";
        rightSt = getHashVar(right.source());
        rightDebugSt = right.source();
        rtSt = updateSt(rtSt, "(rule (Read1 " + getHashVar(right.source()) + " " + hashPos + "))");
        numCons++;
        rtDebugSt = updateSt(rtDebugSt, "Read1 ( " + right.source() + " " + hashPos + " )");
    } else if (right.type === 'MemberExpression') {
        // others
        rightType = "two";
        while (right.object !== undefined && right.object.type === 'MemberExpression') {
            right = right.object;
        }
        // this property
        if (right.object.source() === "this") {
            right.object.update(right.funcRange);
        }
        var object = right.object.source();
        var property = right.property.source();
        rightSt = updateSt(rightSt, getHashVar(object) + " " + getHashVar(property));
        rightDebugSt = updateSt(rightDebugSt, object + " " + property);
        rtSt = updateSt(rtSt, "(rule (Read2 " + getHashVar(object) + " " + getHashVar(property) + " " + hashPos + " ))");
        numCons++;
        rtDebugSt = updateSt(rtDebugSt, "(rule (Read2 " + object + " " + property + " " + hashPos + " ))");
    } else if (right.type === 'ArrayExpression' || right.type === "Literal" || right.type === "ObjectExpression") {
        rightType = "one";
        o_name = hashCnt + "tempHash";
        name = hashCnt + "tempVal";
        hashCnt++;
        // Heap
        rtSt = updateSt(rtSt, "(rule (Heap " + getHashVar(name) + " " + getHashVar(o_name) + " ))");
        numCons++;
        rtDebugSt = updateSt(rtDebugSt, "Heap(" + name + " " + o_name + ")");
        rightSt = updateSt(rightSt, getHashVar(name));
        rightDebugSt = updateSt(rightDebugSt, name);
    } else if (right.type === 'NewExpression') {
        rightType = "one";
        // native function check
        if (nativeList[right.callee.source()] === undefined) {
            rightSt = updateSt(rightSt, getHashVar(right.callee.source()));
            rightDebugSt = updateSt(rightDebugSt, right.callee.source());
            // fact: Actual(i, z, v)
            rtSt = updateSt(rtSt, "(rule (Actual " + hashPos + " #x0000 " + getHashVar(right.callee.source()) + " ))");
            numCons++;
            rtDebugSt = updateSt(rtDebugSt, "Actual(" + hashPos + " #x0000 " + right.callee.source()+")");
            var cnt = 1;
            for (var i in right.arguments) {
                var param = right.arguments[i];
                if (param.type === 'Literal' || param.type === 'ArrayExpression' || param.type === 'ObjectExpression') {
                    o_name = hashCnt + "tempHash";
                    name = hashCnt + "tempVal";
                    hashCnt++;
                    hashVarObj.insert(o_name);
                    rtSt = updateSt(rtSt, "(rule (Heap " + getHashVar(name) + " " + getHashVar(o_name) + " ))");
                    numCons++;
                    rtDebugSt = updateSt(rtDebugSt, "Heap(" + name + " " + o_name + ")");
                    rtSt = updateSt(rtSt, "(rule (Actual "+hashPos+" "+getZ3Num(cnt)+" "+getHashVar(name)+" ))");
                    numCons++;
                    rtDebugSt = updateSt(rtDebugSt, "Actual("+hashPos+" "+cnt+" "+name+")");
                } else {
                    var paramHash = getHashVar(param.source());
                    rtSt = updateSt(rtSt, "(rule (Actual "+hashPos+" "+getZ3Num(cnt)+" "+paramHash+" ))");
                    numCons++;
                    rtDebugSt = updateSt(rtDebugSt, "Actual("+hashPos+" "+cnt+" "+param.source()+")");
                }
                cnt++;
            }
            // fact: CallRet(i, v);
            rtDebugSt = updateSt(rtDebugSt, "CallRet(" + hashPos + " " + left.source() + ")");
            rtSt = updateSt(rtSt, "(rule (CallRet "+hashPos+" "+getHashVar(left.source())+" ))");
            numCons++;
        } else {
            o_name = hashCnt + "tempHash";
            name = hashCnt + "tempVal";
            hashCnt++;
            // Heap
            rtSt = updateSt(rtSt, "(rule (Heap " + getHashVar(name) + " " + getHashVar(o_name) + " ))");
            numCons++;
            rtDebugSt = updateSt(rtDebugSt, "Heap(" + name + " " + o_name + ")");
            rightSt = getHashVar(name);
            rightDebugSt = name;
        }
    } else if (right.type === 'CallExpression') {
        temp = checkCallExpression(left, right, hashPos);
        return {
            "type": "call",
            "rtDebugSt": temp.rtDebugSt,
            "rtSt": temp.rtSt
        };
    } else {
        var ndArr = [];
        ndArr = normalizeExpression(right);
        for (var j=0; j<ndArr.length; j++) {
            rtSt = updateSt(rtSt, allAssignment(left, ndArr[j], hashPos));
            if (ndArr[j].parent.type === "UpdateExpression") {
                temp = allAssignment(ndArr[j], ndArr[j], hashPos);
            }
        }
        if (j === 0) {
            return {
                "type": "nothing"
            };
        }
        return {
            "type": "normalize",
            "rtSt": rtSt
        };
    }

    return {
        "type": rightType,
        "rightSt": rightSt,
        "rightDebugSt": rightDebugSt,
        "rtSt": rtSt,
        "rtDebugSt": rtDebugSt
    };
}
var tempCnt = 0;
var noneCnt = 0;
function allAssignment(left, right, hashPos)
{
    "use strict";
    // for the left side
    var leftType, temp;
    var leftSt = "", leftDebugSt = "";
    var rtSt = "", rtDebugSt = "";
    if (left === null) {
        leftType = "one";
        leftSt = updateSt(leftSt, getHashVar("none" + noneCnt));
        leftDebugSt = updateSt(leftDebugSt, "none" + noneCnt);
        noneCnt++;
    } else if (left.type === 'Identifier') {
        leftType = "one";
        leftSt = updateSt(leftSt, getHashVar(left.source()));
        leftDebugSt = updateSt(leftDebugSt, left.source());
        if (left.source().indexOf("TempV") === -1) {
            rtSt = updateSt(rtSt, "(rule (Write1 " + getHashVar(left.source()) + " " + hashPos + "))");
            numCons++;
            rtDebugSt = updateSt(rtDebugSt, "Write1 (" + left.source() + " " + hashPos + ")");
        }
    } else if (left.type === 'MemberExpression') {
        // dom installation check
        temp = domInstallCheck(left, right, hashPos);
        if (temp.result) {
            return temp.rtSt;
        }
        // others
        leftType = "two";
        while (left.object !== undefined && left.object.type === 'MemberExpression') {
            left = left.object;
        }
        // this property check
        if (left.object.source() === "this") {
            left.object.update(left.funcRange);
        }
        var object = left.object.source();
        var property = left.property.source();
        leftSt = updateSt(leftSt, getHashVar(object) + " " + getHashVar(property));
        leftDebugSt = updateSt(leftDebugSt, object + " " + property);
        rtSt = updateSt(rtSt, "(rule (Write2 " + getHashVar(object) + " " + getHashVar(property) + " " + hashPos + " ))");
        numCons++;
        rtDebugSt = updateSt(rtDebugSt, "(rule (Write2 " + object + " " + property + " " + hashPos + " ))");
    } else {
        throw new Error("Another left type??");
    }

    // right side
    temp = rightSide(left, right, hashPos);
    var rightType = temp.type;
    rtSt = updateSt(rtSt, temp.rtSt);
    rtDebugSt = updateSt(rtDebugSt, temp.rtDebugSt);
    var rightSt = temp.rightSt;
    var rightDebugSt = temp.rightDebugSt;

    // return part
    if (rightType === "normalize") {
        return rtSt;
    } else if (rightType === "call") {
        // do nothing
        console.log(rtDebugSt);
        return rtSt;
    } else if (rightType === "nothing") {
        return "";
    } else if (leftType === "one" && rightType === "one") {
        rtSt = updateSt(rtSt, "(rule (Assign " + leftSt + " " +rightSt+" " + hashPos + " ))");
        numCons++;
        rtDebugSt = updateSt(rtDebugSt, "Assign(" + leftDebugSt + " " + rightDebugSt + " " + hashPos + ")");
    } else if (leftType === "two" && rightType === "one") {
        rtSt = updateSt(rtSt, "(rule (Store " + leftSt + " " + rightSt + " " + hashPos+ " ))");
        numCons++;
        rtDebugSt = updateSt(rtDebugSt, "Store(" + leftDebugSt + " " + rightDebugSt + " " + hashPos + ")");
    } else if (leftType === "one" && rightType === "two") { 
        rtSt = updateSt(rtSt, "(rule (Load " + leftSt + " " + rightSt + " " + hashPos + " ))");
        numCons++;
        rtDebugSt = updateSt(rtDebugSt, "Load(" + leftDebugSt + " " + rightDebugSt + " " + hashPos + ")");
    } else if (leftType === "two" && rightType === "two") {
        var tempN = "ttemp" + tempCnt;
        var hashN = getHashVar(tempN);
        tempCnt++;
        rtSt = updateSt(rtSt, "(rule (Load " + hashN + " " + rightSt + " " + hashPos + " ))");
        numCons++;
        rtSt = updateSt(rtSt, "(rule (Store " + leftSt + " " + hashN + " " + hashPos + " ))");
        numCons++;
        rtDebugSt = updateSt(rtDebugSt, "(rule (Load " + tempN + " " + rightDebugSt + " " + hashPos + " ))");
        rtDebugSt = updateSt(rtDebugSt, "(rule (Store " + leftDebugSt + " " + tempN + " " + hashPos + " ))");
    } else {
        throw new Error("two two case????");
    }
    console.log(rtDebugSt);
    return rtSt;
}

var install = false;
function traverseCFGM(root) 
{
    "use strict";
    iterCFG(root, function(nd) {
        // set hash value for statement
        setHashStmt(nd);
        var rtSt = "";
        var o_name, o_nameHash;
        var nameHash;
        var paramHash, temp;
        var testFlag = false;
        var cnt;
        if (nd.type !== 'Entry') {

            if (!install) {
                rtSt = updateSt(rtSt, "(rule (Dom " + getHashVar("document") + " " + getHashVar("doc") + " ))");
                numCons++;
                console.log("Dom(document doc)");
                install = true;
            }

            var hashPos = ast.getAttribute(nd, 'hash');

            // function declaration
            if (nd.type === 'FunctionDeclaration') {
                testFlag = true;
                o_name = "O_" + nd.id.source();
                o_nameHash = getHashVar(o_name);
                nameHash = getHashVar(nd.id.source());
                console.log("================================================");
                console.log("functionDeclaration: " + nd.id.source());
                rtSt = updateSt(rtSt, ";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;");
                rtSt = updateSt(rtSt, ";functionDeclaration: " + nd.id.source());
                // Fact: FuncDecl(O_func)
                rtSt = updateSt(rtSt, "(rule (FuncDecl " + nameHash + " " + o_nameHash + " " + hashPos +" ))");
                numCons++;
                console.log("FuncDecl(" + nd.id.source() + " " + o_name + " " + hashPos + ")");
                // Fact: Formal(O_func, 1, param1)
                cnt = 1;
                for (var i in nd.params) {
                    paramHash = getHashVar(nd.params[i].source());
                    rtSt = updateSt(rtSt,"(rule (Formal "+o_nameHash+" "+getZ3Num(cnt)+" "+paramHash+" ))");
                    numCons++;
                    console.log("Formal(" +o_name+" "+cnt+" "+nd.params[i].source() + ")");
                    cnt++;
                }
            }

            // "return"
            if (nd.type === 'ReturnStatement' && nd.argument !== null) {
                testFlag = true;
                console.log("================================================");
                console.log("ReturnStatement: " + nd.source());
                rtSt = updateSt(rtSt, ";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;");
                rtSt = updateSt(rtSt, ";ReturnStatement: " + nd.source());
                // Fact: MethodRet(O_func param)
                o_name = "O_" + nd.funcRange;
                o_nameHash = getHashVar(o_name);
                paramHash = getHashVar(nd.argument.source());
                rtSt = updateSt(rtSt, "(rule (MethodRet "+o_nameHash+" " + paramHash + " ))");
                numCons++;
                console.log("MethodRet("+o_name+" "+nd.argument.source()+")");
            }

            // All assignmentExpression
            if (nd.type === 'ExpressionStatement' && nd.expression.type === 'AssignmentExpression') {
                testFlag = true;
                console.log("================================================");
                rtSt = updateSt(rtSt, ";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;");
                var exp = nd.expression;
                if (exp.right.type === 'FunctionExpression') {
                    o_name = "O_" + exp.left.source();
                    o_nameHash = getHashVar(o_name);
                    nameHash = getHashVar(exp.left.source());
                    console.log("functionDeclaration: " + exp.left.source());
                    rtSt = updateSt(rtSt, ";functionDeclaration: " + exp.left.source());
                    // Fact: FuncDecl(O_func)
                    rtSt = updateSt(rtSt, "(rule (FuncDecl " + nameHash + " " + o_nameHash + " " +hashPos + " ))");
                    numCons++;
                    console.log("FuncDecl(" + exp.left.source() + " " + o_name + " " + hashPos + ")");
                    // Fact: Formal(O_func, 1, param1)
                    cnt = 1;
                    for (var i in exp.right.params) {
                        paramHash = getHashVar(exp.right.params[i].source());
                        rtSt = updateSt(rtSt,"(rule (Formal "+o_nameHash+" "+getZ3Num(cnt)+" "+paramHash+" ))");
                        numCons++;
                        console.log("Formal(" +o_name+" "+cnt+" "+exp.right.params[i].source() + ")");
                        cnt++;
                    }
                }
                // This property
                else if (exp.left.type === 'MemberExpression' && exp.left.object.type === 'ThisExpression') {
                    console.log("ThisExpression: " + nd.source());
                    rtSt = updateSt(rtSt, ";ThisExpression: " + nd.source());
                    console.log(exp.left.type + ", " + exp.right.type);
                    temp = allAssignment(exp.left, exp.right, hashPos);
                    rtSt = updateSt(rtSt, temp);
                } else {
                    // other assignment
                    console.log("Assignment: " + nd.source());
                    rtSt = updateSt(rtSt, ";Assignment: " + nd.source());
                    temp = allAssignment(exp.left, exp.right, hashPos);
                    rtSt = updateSt(rtSt, temp);
                }
            }

            // All Variable declaration 
            if (nd.type === 'VariableDeclaration') {
                testFlag = true;
                console.log("================================================");
                console.log("VariableDecl: " + nd.source());
                rtSt = updateSt(rtSt, ";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;");
                rtSt = updateSt(rtSt, ";VariableDecl: " + nd.source());
                for (var i in nd.declarations) {
                    var dec = nd.declarations[i];
                    if (dec.init !== null) {
                        console.log(dec.id.type + ", " + dec.init.type);
                        temp = allAssignment(dec.id, dec.init, hashPos);
                        rtSt = updateSt(rtSt, temp);
                    }
                }
            }

            // All Call expression
            if (nd.type === 'ExpressionStatement' && nd.expression.type === 'CallExpression') {
                testFlag = true;
                console.log("================================================");
                console.log("CallExpression: " + nd.source());
                rtSt = updateSt(rtSt, ";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;");
                rtSt = updateSt(rtSt, ";CallExpression: " + nd.source());
                temp = checkCallExpression(null, nd.expression, hashPos);
                console.log(temp.rtDebugSt);
                rtSt = updateSt(rtSt, temp.rtSt);
            }

            // update expression1
            if (nd.type === 'UpdateExpression') {
                testFlag = true;
                console.log("================================================");
                console.log("UpdateExpression: " + nd.source());
                rtSt = updateSt(rtSt, ";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;");
                rtSt = updateSt(rtSt, ";UpdateExpression: " + nd.source());
                temp = allAssignment(nd.argument, nd.argument, hashPos);
                rtSt = updateSt(rtSt, temp);
            }
            // update expression2
            if (nd.type === 'ExpressionStatement' && nd.expression.type === 'UpdateExpression') {
                testFlag = true;
                console.log("================================================");
                console.log("UpdateExpression: " + nd.source());
                rtSt = updateSt(rtSt, ";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;");
                rtSt = updateSt(rtSt, ";UpdateExpression: " + nd.source());
                temp = allAssignment(nd.expression.argument, nd.expression.argument, hashPos);
                rtSt = updateSt(rtSt, temp);
            } 

            // MemberExpression
            if (nd.type === 'MemberExpression') {
                testFlag = true;
                console.log("================================================");
                console.log("MemberExpression: " + nd.source());
                rtSt = updateSt(rtSt, ";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;");
                rtSt = updateSt(rtSt, ";MemberExpression: " + nd.source());
                temp = allAssignment(null, nd, hashPos);
                rtSt = updateSt(rtSt, temp);
            }

            // BinaryExpression & LogicalExpression
            if (nd.type === 'BinaryExpression' || nd.type === 'LogicalExpression' || nd.type === 'Identifier') {
                testFlag = true;
                console.log("================================================");
                console.log(nd.type + ": " + nd.source());
                rtSt = updateSt(rtSt, ";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;");
                rtSt = updateSt(rtSt, ";" + nd.type + ": " + nd.source());
                temp = allAssignment(null, nd, hashPos);
                rtSt = updateSt(rtSt, temp);
            }

            // don't have to check if and for
            if (nd.type === 'IfStatement' || nd.type === 'ForStatement') {
                testFlag = true;
            }

            // others for debug purpose
            if (!testFlag) {
                console.log("===================undetected================");
                console.log(nd.type + ": " + nd.source());
            }

            // print stmt
            temp = printStmt(nd);
            rtSt = updateSt(rtSt, temp);
            numCons++;
            // write file
            smt2FileWrite(rtSt);
        }
    });
}
module.exports = {
    phase: function(root) {
        "use strict";
        makeGeneralRule();
        traverseCFGM(root);
        traverseCFG0(root);
        addQuery();
        printHashVarAll();
        consFileWrite();
    }
};


/******************************************************************************************/
/**********************************NOT USED NOW********************************************/
/******************************************************************************************/
// Not used now... 
function traverseCFG0(root)
{
    "use strict";
    // related with control-dependency //
    iterCFG(root, function (nd) {
        //debugStmtSave(nd);
        inverseIpdomObj.insert(nd);
    });
    //debugStmtPrint();
    iterCFG(root, function (nd) {
        constructCD(nd);
        //debugCDSave(nd);
        printCD(nd);
    });
}

function traverseCFG1(root)
{
    "use strict";
    // print flow & stmt facts
    iterCFG(root, function (nd) {
        printFlow(nd);
    });
    // I split this for debuging purpose
    iterCFG(root, function (nd) {
        printStmt(nd);
    });
}

function getAllPreds(nd)
{
    "use strict";
    var predArr = [];
    var pred = ast.getAttribute(nd, 'pred');
    if (pred !== undefined) {
        if (pred.length === undefined) {
            predHash = ast.getAttribute(pred, 'hash');
            predArr.push(predHash);
            var update = getAllPreds(pred);
            for (var j=0; j<update.length; j++) {
                predArr.push(update[j]);
            }
        } else {
            for (var i=0; i<pred.length; i++) {
                var predHash = ast.getAttribute(pred[i], 'hash');
                predArr.push(predHash);
                var update = getAllPreds(pred[i]);
                for (var j=0; j<update.length; j++) {
                    predArr.push(update[j]);
                }
            }
        }
    }
    return predArr;
}

/***************************************************************** 
   Control dependence construction algorithm 
   from Figure 7.10 of Advanced Compiling For High Performance
   -------------------------------
   Procedure ConstructCD(G, CD)
   // G is the input control flow graph
   // CD(x) is the set of blocks on which x is control dependent
   // ipostdom(x) is the immediate postdominator of block x in the
   //   control flow graph G

   L1: find the immediate postdominator relation ipostdom for the control
        flow graph G; (For a control flow graph with a single exit, this
        relation forms a tree, with the exit node as the root.)
       let l be a topological listing of the postdominator tree such that,
        if x postdominates y, then x comes after y in l.

   L2: while l != null do begin
          let x be the first element of l;
          remove x from l;

   L3:    for all control flow predecessors y of x do
              if ipostdom(y) != x then CD(x) = CD(x) + {y};

   L4:    for all z such that ipostdom(z) = x do
              for all y in CD(z) do
                  if ipostdom(y) != x then CD(x) = CD(x) + {y};
       end

   end ConstructCD
*********************************************************************/

/*************************************************
  Functions for control dependency debug
**************************************************/
var debugCDMsg = "";
function debugCDSave(nd)
{
    "use strict";
    var ndHash = ast.getAttribute(nd, 'hash');
    var cd = ast.getAttribute(nd, 'cd');
    debugCDMsg = debugCDMsg + '\n----------------------';
    debugCDMsg = debugCDMsg + "\n Construct with " + ndHash; 
    debugCDMsg = debugCDMsg + "\n CD(x): " + cd;
}
function debugCDPrint()
{
    "use strict";
    var fd = fs.openSync('cdDebug.txt', 'w+');
    fs.writeSync(fd, debugCDMsg);
}

/*************************************************
  Main function of control dependency construction
**************************************************/
function constructCD(nd)
{
    // ipostdom is ipdom here and ipdom has been made already.
    // And I assume that nd would be the x from l and x comes in regular sequence
    //   as described above.
    // Therefore, I just make L3 and L4 part.
    "use strict";
    if (nd.type === 'Entry') {
        ast.setAttribute(nd, 'cd', []);
        return;
    }
    //console.log('=====================');
    var cd = [];
    var ndHash = ast.getAttribute(nd, 'hash');
    //console.log("Construct with " + ndHash);
    //var predArr = getAllPreds(nd);
    var predArr = getPreds(nd);

    // predArr is array of predecessors' hash values
    for (var i=0; i<predArr.length; i++) {
        var predNd = hashStmtObj.getNode(predArr[i]);
        var ipdom = ast.getAttribute(predNd, 'ipdom');
        var ipdomHash = ast.getAttribute(ipdom, 'hash');
        if (ndHash !== ipdomHash) {
            var predHash = ast.getAttribute(predNd, 'hash');
            cd.push(predHash);
        }
    }
    //console.log("Midde CD " + cd);
    
    var inverseIpdomArr = inverseIpdomObj.get(ndHash);
    if (inverseIpdomArr !== undefined) {
        for (i=0; i<inverseIpdomArr.length; i++) {
            var inverseNd = hashStmtObj.getNode(inverseIpdomArr[i]);
            if (inverseNd !== undefined && inverseNd.type !== 'Entry') {
                var cdArr = ast.getAttribute(inverseNd, 'cd');
                if (cdArr === undefined) {
                    ast.setAttribute(inverseNd, 'cd', []);
                    cdArr = [];
                }
                //console.log(inverseNd.source());
                //console.log(cdArr);
                for (var j=0; j<cdArr.length; j++) {
                    // cdArr[j] is y's hash value, above algorithm
                    var cdArrNd = hashStmtObj.getNode(cdArr[j]);
                    var ipdomCDArr = ast.getAttribute(cdArrNd, 'ipdom');
                    var hashIpdomCDArr = ast.getAttribute(ipdomCDArr, 'hash');
                    // hashIpdomCDArr is ipostdom(y)'s hash value
                    if (hashIpdomCDArr !== ndHash) {
                        cd.push(cdArr[j]);
                    }
                }
            }
        }
    }
    //console.log("Final CD " + cd);
    ast.setAttribute(nd, 'cd', cd);
}

function getPreds(nd)
{
    "use strict";
    var predArr = [];
    var pred = ast.getAttribute(nd, 'pred');
    if (pred !== undefined) {
        if (pred.length === undefined) {
            predHash = ast.getAttribute(pred, 'hash');
            predArr.push(predHash);
        } else {
            for (var i=0; i<pred.length; i++) {
                var predHash = ast.getAttribute(pred[i], 'hash');
                predArr.push(predHash);
            }
        }
    }
    return predArr;
}

/*************************************************
    Functions for control-dep print 
**************************************************/
function printCD(nd)
{
    "use strict";
    var cd = ast.getAttribute(nd, 'cd');
    var hash = ast.getAttribute(nd, 'hash');
    var rtSt = "";
    for (var i=0; i<cd.length; i++) {
        if (cd[i] === undefined) {
            continue;
        }
        console.log("================================================");
        console.log("control info");
        rtSt = updateSt(rtSt, ";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;");
        rtSt = updateSt(rtSt, "; control info");
        numCons++;
        rtSt = updateSt(rtSt, "(rule (control-dep " + cd[i] + " " + hash +" ))");
    }
    // write file
    smt2FileWrite(rtSt);
}
