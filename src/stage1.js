var fs = require('fs');
var falafel = require('falafel');

var filename = process.argv[2];

var code1 = fs.readFileSync(filename).toString();
var summary = {};

var Keys = {
        AssignmentExpression: ['left', 'right'],
        ArrayExpression: ['elements'],
        BlockStatement: ['body'],
        BinaryExpression: ['left', 'right'],
        BreakStatement: ['label'],
        CallExpression: ['callee', 'arguments'],
        CatchClause: ['param', 'body'],
        ConditionalExpression: ['test', 'consequent', 'alternate'],
        ContinueStatement: ['label'],
        DoWhileStatement: ['body', 'test'],
        DebuggerStatement: [],
        EmptyStatement: [],
        ExpressionStatement: ['expression'],
        ForStatement: ['init', 'test', 'update', 'body'],
        ForInStatement: ['left', 'right', 'body'],
        FunctionDeclaration: ['id', 'params', 'body'],
        FunctionExpression: ['id', 'params', 'body'],
        Identifier: [],
        IfStatement: ['test', 'consequent', 'alternate'],
        Literal: [],
        LabeledStatement: ['label', 'body'],
        LogicalExpression: ['left', 'right'],
        MemberExpression: ['object', 'property'],
        NewExpression: ['callee', 'arguments'],
        ObjectExpression: ['properties'],
        Program: ['body'],
        Property: ['key', 'value'],
        ReturnStatement: ['argument'],
        SequenceExpression: ['expressions'],
        SwitchStatement: ['descriminant', 'cases'],
        SwitchCase: ['test', 'consequent'],
        ThisExpression: [],
        ThrowStatement: ['argument'],
        TryStatement: ['block', 'handlers', 'finalizer'],
        UnaryExpression: ['argument'],
        UpdateExpression: ['argument'],
        VariableDeclaration: ['declarations'],
        VariableDeclarator: ['id', 'init'],
        WhileStatement: ['test', 'body'],
        WithStatement: ['object', 'body']
};
/////////////////////////////// PHASE0 related START //////////////////////////////////
var temporalNameMaker = function () {
    "use strict";
    this.functionNameCnt = 0;
    this.variableNameCnt = 0;
};
temporalNameMaker.prototype = {
    makeVariableName: function () {
                          "use strict";
                          return 'TempV'+this.variableNameCnt++;
                      },
    makeFunctionName: function () {
                          "use strict";
                          return 'TempF'+this.functionNameCnt++;
                      },
    deleteFuncName: function() {
                        "use strict";
                       this.functionNameCnt--;
                   },
    deleteVarName: function() {
                        "use strict";
                       this.variableNameCnt--;
                   }
};
// make a nameMaker for global scope (just temporal way to distinguish all temporal variables..
var globalNameMaker = new temporalNameMaker ();
var hashVarStmt = {};
var hashVarObj = {
    check: function (splitString) {
        "use strict";
        if (hashVarStmt[splitString] === undefined) {
            return false;
        } else {
            return true;
        }
    },
    insert: function (tempName, splitString) {
        "use strict";
        hashVarStmt[splitString] = tempName;
    }, 
    get: function (tempName, splitString) {
        "use strict";
        return hashVarStmt[splitString];
    }
};
// split one expression manually
function SplitExpression(node)
{
    "use strict";
    var originExp = node.source().toString();
    var bracketCnt = 0;
    var start=0, end=0;
    var sliceArr = [];
    // parsing process
    while (true) {
        if (originExp[end] === '.') {
            // if there is a dot, save one block to sliceArr
            sliceArr.push(originExp.slice(start, end));
            start = end + 1; // move start point
        } else if (originExp[end] === '(') {
            while (true) {
                if (originExp[end] === '(') {
                    bracketCnt++;
                }
                if (originExp[end] === ')') {
                    bracketCnt--;
                }
                if (bracketCnt === 0) {
                    break;
                }
                end++;
            }
        } else if (originExp[end] === '[') {
            while (true) {
                if (originExp[end] === '[') {
                    bracketCnt++;
                }
                if (originExp[end] === ']') {
                    bracketCnt--;
                }
                if (bracketCnt === 0) {
                    break;
                }
                end++;
            }
        }
        end++;
        if (end === originExp.length) {
            sliceArr.push(originExp.slice(start, end));
            break;
        }
    }
    // parsing done.
    // now, it will make temporal variables for simplifying an expression
    if (sliceArr[0] !== undefined && sliceArr[0][0] === '$' && sliceArr.length < 2) {
        return null;
    } 
    if (sliceArr[0][0] !== '$' && sliceArr.length < 3) {
        // if there is only one dot -> we don't have to make a temporal variable
        return null;
    }
    var returnArr = [];
    var name = globalNameMaker.makeVariableName();
    var index;
    if (sliceArr[0][0] === '$') {
        returnArr = 'var ' + name + ' = ' + sliceArr[0] + ';\n';
        index = 1;
    } else {
        returnArr = 'var ' + name + ' = ' + sliceArr[0] + '.' + sliceArr[1] + ';\n';
        index = 2;
    }
    var lastName = name;
    while (true) {
        if (index === sliceArr.length-1) {
            node.update(name + '.' + sliceArr[index]);
            return returnArr;
        }
        name = globalNameMaker.makeVariableName();
        returnArr = returnArr + 'var ' + name + ' = ' + lastName + '.' + sliceArr[index] + ';\n';
        lastName = name;
        index++;
    }
}
/* 
 getStableNode: 
    it will find a stable node for adding temporal variables in front of statement
*/
function getStableNode(node)
{
    "use strict";
    var indexNode = node.parent;
    if (indexNode.type === 'Program' || indexNode.type === 'BlockStatement') {
        return indexNode.body[0];
    }
    while(true) {
        //console.log("======================");
        if(indexNode.parent.type !== 'CallExpression') {
            if (indexNode.type === 'IfStatement' && indexNode.parent.type !== 'IfStatement') {
                break;
            }
            if (indexNode.type === 'Program' || indexNode.type === 'BlockStatement') {
                indexNode = indexNode.body[0];
                break;
            }
            if (indexNode.type === "VariableDeclaration" || indexNode.type === "AssignmentExpression" || indexNode.type === "ExpressionStatement" || indexNode.type === "ForStatement" || indexNode.type === "WhileStatement") {
                break;
            }
        }
        indexNode = indexNode.parent;
    }
    return indexNode; 
}
// Phase0 function which gets code and returns modified code.
function checkPullArgu(argument) {
    "use strict";
    var returnString = null;
    for (var i in argument) {
        if (argument[i].type !== 'ArrayExpression' && argument[i].type !== 'Literal' && argument[i].type !== 'Identifier') {
            var name = globalNameMaker.makeVariableName();
            if (returnString === null) {
                returnString = 'var ' + name + ' = ' + argument[i].source() + ';\n';
            } else {
                returnString = returnString + '\n' + 'var ' + name + ' = ' + argument[i].source() + ';\n';
            }
            argument[i].update(name);
        }
    }
    return returnString;
}

function pullExpression(node) {
    "use strict";
    var returnString = null;
    var name = globalNameMaker.makeVariableName();
    returnString = 'var ' + name + ' = ' + node.source() + ';\n';
    node.update(name);
    return returnString;
}

module.exports = {
    phase0: function (code) {
        "use strict";
        /* Phase 0A - anonymous function naming */
        var phase0A = falafel(code, function(node) {
            var temp, tempFuncName, indexNum;
            if (node.type === 'CallExpression') {
                if (node.callee.type === 'FunctionExpression') {
                    temp = node.callee.source().toString();
                    indexNum = temp.indexOf("function") + 8;
                    tempFuncName = globalNameMaker.makeFunctionName();
                    temp = temp.slice(0, indexNum) + " " + tempFuncName + " " + temp.slice(indexNum + Math.abs(0));
                    node.callee.update(tempFuncName); 
                    node.parent.update(temp + '\n' + node.parent.source());
                } else {
                    for (var i in node.arguments) {
                        if (node.arguments[i] !== undefined && node.arguments[i].type === 'FunctionExpression') {
                            temp = node.arguments[i].source().toString();
                            tempFuncName = globalNameMaker.makeFunctionName(); 
                            indexNum = temp.indexOf("function") + 8;
                            tempFuncName = globalNameMaker.makeFunctionName();
                            temp = temp.slice(0, indexNum) + " " + tempFuncName + " " + temp.slice(indexNum + Math.abs(0));
                            node.arguments[i].update(tempFuncName); 
                            node.parent.update(temp + '\n' + node.parent.source());
                        }
                    }
                }
            }
        }).toString();
        /* Phase 0B - pull out all arguments except literal, Identifier, and Array*/
        /* The reason of doing Phase 0D: It will be easier to track DOM dependancy */
        var parentArr = [], splitArr = [];
        var phase0B = falafel (phase0A, function(node) {
            var tempUpdate;
            if (node.arguments !== undefined) {
                tempUpdate = checkPullArgu(node.arguments);
                if (tempUpdate !== null) {
                    var stableNode = getStableNode(node);
                    parentArr.push(stableNode);
                    splitArr.push(tempUpdate);
                }
            }
            var index = parentArr.length;
            var gatherString = [];
            while (true) {
                if (parentArr[index-1] === node) {
                    // check whether stable node is same as node, then gather gatherString
                    gatherString = splitArr[index-1] + gatherString;
                    parentArr.pop();
                    splitArr.pop();
                } else {
                    if (gatherString !== null) {
                        node.update(gatherString + node.source());
                    }
                    break;
                }
                index--;
            }
        }).toString();
        /* Phase 0C - pulling out expression statements from objectExpression */
        // ex) var a = { index: this.c.d('a1'), ...};
        // => var a = { index: undefined, ... }; 
        //    a.index = a.c.d('a1');
        var phase0C = falafel(phase0B, function(node) {
            if (node.type === 'ObjectExpression') {
                var name;
                if (node.parent.type === 'VariableDeclarator') {
                    name = node.parent.id.source();
                } else if (node.parent.type === 'AssignmentExpression') {
                    name = node.parent.left.source();
                } else {
                    if (node.parent.type !== 'ReturnStatement') {
                        console.log('I am not covering Phase0B');
                    }
                }
                var tempSource = [];
                for (var i in node.properties) {
                    var tempNode1 = node.properties[i].value;
                    if (tempNode1.type === 'CallExpression' || tempNode1.type === 'MemberExpression') {
                        if (node.properties[i].key.source()[0] === "\"" || node.properties[i].key.source()[0] === "\'") {
                            tempSource = tempSource + '\n' + name + '[' + node.properties[i].key.source() + ']';
                        } else {
                            tempSource = tempSource + '\n' + name + '.' + node.properties[i].key.source();
                        }
                        tempSource = tempSource + ' = ' + tempNode1.source().replace(/this/g, name) + ';';
                        tempNode1.update('undefined');
                    }
                }
                if (tempSource !== []) {
                    node.parent.parent.update(node.parent.parent.source() + tempSource);
                }
            } 
        }).toString();
        /* Phase 0E - split all statements into single actions */
        var phase0D = falafel(phase0C, function(node) {
            var tempSplit = null;
            if (node.type === 'MemberExpression') {
                if (node.property.type !== 'Literal' && node.property.type !== 'Identifier') {
                    //console.log(node.property.source());
                    tempSplit = pullExpression(node.property);
                }
            }
            if (tempSplit !== null) {
                var stableNode = getStableNode(node);
                parentArr.push(stableNode);
                splitArr.push(tempSplit);
            }
            var index = parentArr.length;
            var gatherString = [];
            while (true) {
                if (parentArr[index-1] === node) {
                    // check whether stable node is same as node, then gather gatherString
                    gatherString = splitArr[index-1] + gatherString;
                    parentArr.pop();
                    splitArr.pop();
                } else {
                    if (gatherString !== null) {
                        node.update(gatherString + node.source());
                    }
                    break;
                }
                index--;
            }
        }).toString();
        /* Phase 0D - split all statements into single actions */ 
        var phase0E = falafel(phase0D, function(node) {
            var tempSplit;
            if (node.type === 'CallExpression' || node.type === 'MemberExpression') {
                if (checkMinConCallOrMem(node)) {
                    tempSplit = SplitExpression(node);
                    if (tempSplit !== null) {
                        var stableNode = getStableNode(node);
                        parentArr.push(stableNode);
                        splitArr.push(tempSplit);
                    }
                }
            }
            var index = parentArr.length;
            var gatherString = [];
            while (true) {
                if (parentArr[index-1] === node) {
                    // check whether stable node is same as node, then gather gatherString
                    gatherString = splitArr[index-1] + gatherString;
                    parentArr.pop();
                    splitArr.pop();
                } else {
                    if (gatherString !== null) {
                        node.update(gatherString + node.source());
                    }
                    break;
                }
                index--;
            }
        }).toString();
        /* Phase 0F - normalize the assignment form */ 
        // ex) a.b = c.d;  ==> var temp = c.d; a.b = temp;
        var phase0F = falafel(phase0E, function(node) {
            var set = false;
            if (node.type === 'AssignmentExpression') {
                if (node.left.type === 'MemberExpression') {
                    if (node.right.type === 'CallExpression' && node.right.callee.type === 'MemberExpression') {
                        set = true;
                    } else if (node.right.type === 'MemberExpression') {
                        set = true;
                    }
                }
            }
            if (set === true) {
                var name = globalNameMaker.makeVariableName();
                var string = 'var ' + name + " = " + node.right.source() + ";\n" + node.left.source() + " = " + name;
                node.update(string);
            }
        }).toString();
        /* Phase 0G - if there is a return format which is not literal and identifier, then change it */
        // ex) return (a-b); ==> temp = a-b; return temp;
        var phase0G = falafel(phase0F, function(node) {
            var tempSplit = null;
            if (node.type === 'ReturnStatement') {
                if (node.argument !== null && node.argument.type !== 'Literal' && node.argument.type !== 'Identifier') {
                    tempSplit = pullExpression(node.argument);
                }
            }
            if (tempSplit !== null) {
                var stableNode = getStableNode(node);
                parentArr.push(stableNode);
                splitArr.push(tempSplit);
            }
            var index = parentArr.length;
            var gatherString = [];
            while (true) {
                if (parentArr[index-1] === node) {
                    // check whether stable node is same as node, then gather gatherString
                    gatherString = splitArr[index-1] + gatherString;
                    parentArr.pop();
                    splitArr.pop();
                } else {
                    if (gatherString !== null) {
                        node.update(gatherString + node.source());
                    }
                    break;
                }
                index--;
            }
        }).toString();

        // result of phase0
        return phase0G;
    },
    phase1: function (code) {
        "use strict";
        var scopeHistory = [];
        var lastNode;
        falafel(code, function(node) {
            lastNode = node;         
        });
        enter2(lastNode, scopeHistory);
        // should update summary 
        summary.FunctionTree = FunctionTree;
        return summary;
    }
};
/////////////////////////////// PHASE0 related END //////////////////////////////////
/////////////////////////////// PHASE2 related START //////////////////////////////////
function getArgumentName(node)
{
    "use strict";
    var argu = [];
    for (var i in node) {
        argu.push(getCode(node[i]));
    }
    return argu;
}
function getCode(node)
{
    "use strict";
    var tempString = [];
    if (node.type === 'Identifier') {
        return node.name;
    } else if (node.type === 'Literal') {
        return node.value;
    } else if (node.type === 'MemberExpression') {
        return getCode(node.object) + '.' + getCode(node.property);
    } else if (node.type === 'CallExpression') {
        for (var i in node.arguments) {
            tempString.push(getCode(node.arguments[i]));
        } 
        return getCode(node.callee) + '(' + tempString + ')';
    } else if (node.type === 'BinaryExpression' || node.type === 'AssignmentExpression') {
        return getCode(node.left) + node.operator + getCode(node.right);
    } else if (node.type === 'UpdateExpression') {
        if (node.prefix) {
            return node.operator + getCode(node.argument);
        } else {
            return getCode(node.argument) + node.operator;
        }
    } else {
        console.log(node);
        console.log("!!! get code !!! " + node);
    }
}
function makeFunctionObj() {
    "use strict";
    var returnObj = {};
    returnObj.calls = [];
    returnObj.installs = [];
    returnObj.writes = [];
    returnObj.reads = [];
    returnObj.DomRef = [];
    return returnObj;
}

var FunctionTree = {};

function addNewScope(node, scopeArr) {
    "use strict";
    if (node.type === 'FunctionDeclaration') {
        if (node.id.type === 'Identifier') {
            scopeArr.push(node.id.name);
            FunctionTree[node.id.name] = makeFunctionObj();
            return true;
        } else {
            console.log("Not cover node.id.type != Identifier");
        }
    } else if (node.type === 'FunctionExpression') {
        var name;
        if (node.parent.type === 'CallExpression' && node.parent.parent === 'AssignmentExpression') {
            scopeArr.push(getCode(node.parent.parent.left));
            FunctionTree[getCode(node.parent.parent.left)] = makeFunctionObj();
            return true;
        } else if (node.parent.type === 'VariableDeclarator') {
            scopeArr.push(getCode(node.parent.id));
            FunctionTree[getCode(node.parent.id)] = makeFunctionObj();
            return true;
        } else if (node.parent.type === 'Property') {
            if (node.parent.parent.parent.type === 'VariableDeclarator') {
                name = getCode(node.parent.parent.parent.id) + '.' + getCode(node.parent.key);
                scopeArr.push(name);
                FunctionTree[name] = makeFunctionObj();
                return true;
            } else if (node.parent.parent.parent.type === 'AssignmentExpression') {
                name = getCode(node.parent.parent.parent.left) + '.' + getCode(node.parent.key);
                scopeArr.push(name);
                FunctionTree[name] = makeFunctionObj();
                return true;
            }
        } else {
            console.log("I have to cover this case! ");
        }
    } else if (node.type === 'Program') {
        scopeArr.push('global');
        FunctionTree.global = makeFunctionObj();
        return true;
    }
    return false;
}
function enter2(node, scopeArr)
{
    "use strict";
    var i;
    if (typeof node === 'object') {
        if (node !== null) {
            var shouldpop = addNewScope(node, scopeArr); 
            if (node.type === undefined) {
                for (i in node) {
                    enter2(node[i], scopeArr);
                }
            } else {
                for (i=0; i<Keys[node.type].length; i++) {
                    enter2(node[Keys[node.type][i]], scopeArr);
                }
            }
            checkDomRelation(node, scopeArr);
            if (shouldpop) {
                scopeArr.pop();
            }
        }
    }
}
function phase2(code)
{
    "use strict";
    var scopeHistory = [];
    var lastNode;
    falafel(code, function(node) {
        lastNode = node;         
    });
    enter2(lastNode, scopeHistory);
    // should update summary 
    summary.FunctionTree = FunctionTree;
}
/////////////////////////////// PHASE2 related END //////////////////////////////////
/////////////////////////////// PHASE3 related START //////////////////////////////////
/***********   DomRef, Read, Write, Install **********/
// DomRef, Read: var temp = a.b; var temp = a('t1').b; var temp = a.b('t1'); var temp = a('t1').b('t2');
//               temp = a.b; temp = a('t1').b; temp = a.b('t1'); temp = a('t1').b('t2');
// Write, install: a.b; a('t1').b; a.b('t1'); a('t1').b('t2');
function addType0(type, tag, node, scopeArr)
{
    "use strict";
    var indexNode = node;
    var insertString = '(';
    for (var i in indexNode.arguments) {
        if (indexNode.arguments[i].type === 'Literal') {
            insertString = insertString + indexNode.arguments[i].value + ', ';
        } else if (indexNode.arguments[i].type === 'Identifier') {
            insertString = insertString + indexNode.arguments[i].name + ', ';
        }
    }
    insertString = insertString.substring(0, insertString.length-2);
    insertString = insertString + ')';
    indexNode = indexNode.parent;
    if (indexNode.type === 'AssignmentExpression' || indexNode.type === 'VariableDeclarator') {
        if (indexNode.type === 'AssignmentExpression') {
            insertString = getCode(indexNode.left) + ': ' + insertString;
        } else if (indexNode.type === 'VariableDeclarator') {
            insertString = getCode(indexNode.id) + ': ' + insertString;
        } 
        FunctionTree[scopeArr[scopeArr.length-1]][type].push(insertString);
    } else if (indexNode.type === 'Property') {
        if (indexNode.parent.parent.type === 'AssignmentExpression') {
            insertString = getCode(indexNode.parent.parent.left) + '.' + getCode(indexNode.key) + ': ' + insertString;
        } else if (indexNode.parent.parent.type === 'VariableDeclarator') {
            insertString = getCode(indexNode.parent.parent.id) + '.' + getCode(indexNode.key) + ': ' + insertString;
        }
        FunctionTree[scopeArr[scopeArr.length-1]][type].push(insertString);
    } 
}
function addType1(type, tag, node, scopeArr)
{
    "use strict";
    var indexNode = node.callee;
    var insertString = [];
    while (true) {
        if (indexNode.type === 'CallExpression') {
            if (insertString.length === 0) {
                insertString = insertString + indexNode.arguments[0].value;
            } else {
                insertString = insertString + indexNode.arguments[0].value + ')';
            }
            break;
        } else if (indexNode.type === 'MemberExpression') {
            insertString = '(' + indexNode.object.name + ', ' + tag + ', ';
            indexNode = indexNode.parent;
        } else {
            console.log('1111111?????? unexpected');
        }
    }
    indexNode = indexNode.parent;
    if (indexNode.type === 'AssignmentExpression' || indexNode.type === 'VariableDeclarator') {
        if (indexNode.type === 'AssignmentExpression') {
            insertString = getCode(indexNode.left) + ': ' + insertString;
        } else if (indexNode.type === 'VariableDeclarator') {
            insertString = getCode(indexNode.id) + ': ' + insertString;
        } 
        FunctionTree[scopeArr[scopeArr.length-1]][type].push(insertString);
    } else if (indexNode.type === 'Property') {
        if (indexNode.parent.parent.type === 'AssignmentExpression') {
            insertString = getCode(indexNode.parent.parent.left) + '.' + getCode(indexNode.key) + ': ' + insertString;
        } else if (indexNode.parent.parent.type === 'VariableDeclarator') {
            insertString = getCode(indexNode.parent.parent.id) + '.' + getCode(indexNode.key) + ': ' + insertString;
        }
        FunctionTree[scopeArr[scopeArr.length-1]][type].push(insertString);
    } 
}

function addType2(type, tag, node, scopeArr)
{
    "use strict";
    var indexNode = node.parent;
    var insertString = [];
    while (true) {
        if (indexNode.type === 'CallExpression') {
            insertString = insertString + '{' + getArgumentName(indexNode.arguments) + '})';
            break;
        } else if (indexNode.type === 'MemberExpression') {
            insertString = '(' + indexNode.object.name + ', ' + tag + ', ';
            indexNode = indexNode.parent;
        } else {
            console.log('22222222?????? unexpected');
        }
    }
    FunctionTree[scopeArr[scopeArr.length-1]][type].push(insertString);
}
var DomRefList = function () {
    "use strict";
    this.$ = {
        result: function(node, scopeArr) {
            addType0('DomRef', 'getDom', node, scopeArr);
        }
    };
    this.getElementById = {
        result: function(node, scopeArr) {
            addType1('DomRef', 'getById', node, scopeArr);
        }
    };
    this.getElementsByTagName = {
        result: function(node, scopeArr) {
            addType1('DomRef', 'getByTag', node, scopeArr);
        }
    };
    this.createElement = {
        result: function(node, scopeArr) {
            addType1('DomRef', 'createElement', node, scopeArr);
        }
    };
    this.createTextNode = {
        result: function(node, scopeArr) {
            addType1('DomRef', 'createTextNode', node, scopeArr);
        }
    };
};
var domRef = new DomRefList();
var DomReadList = function () {
    "use strict";
    this.getAttribute = {
        result: function(node, scopeArr) {
            addType1('reads', 'getByTag', node, scopeArr);
        }
    };
};
var domRead = new DomReadList();
var DomWriteList = function () {
    "use strict";
    this.addClass = {
        result: function(node, scopeArr) {
            addType2('writes', 'addclass', node, scopeArr);
        }
    };
    this.setAttribute = {
        result: function(node, scopeArr) {
            addType2('writes', 'attribute', node, scopeArr);
        }
    };
    this.appendChild = {
        result: function(node, scopeArr) {
            addType2('writes', 'appendChild', node, scopeArr);
        }
    };
    this.removeChild = {
        result: function(node, scopeArr) {
            addType2('writes', 'removeChild', node, scopeArr);
        }
    };
};
var domWrite = new DomWriteList();
var DomInstallList = function () {
    "use strict";
    this.click = {
        result: function(node, scopeArr) {
            addType2('installs', 'click', node, scopeArr);
        }
    };
    this.addEventListener = {
        result: function(node, scopeArr) {
            addType2('installs', 'addEvent', node, scopeArr);
        }
    };
    this.ready = {
        result: function(node, scopeArr) {
            addType2('installs', 'ready', node, scopeArr);
        }
    }
};
var domInstall = new DomInstallList();
function check(obj, name) {
   "use strict";
   if (typeof obj[name] !== 'function' && obj[name] !== undefined) {
       return true;
   } else {
       return false;
   }
}
function checkDomRelation(node1, scopeArr)
{
    "use strict";
    if (node1.type === 'CallExpression' || node1.type === 'MemberExpression') {
        if (node1.parent.type !== 'CallExpression' && node1.parent.type !== 'MemberExpression') {
            var test = false;
            falafel(node1.source().toString(), function(node) {
                if (node.type === 'Identifier') {
                    if (check(domRef, node.name)) {
                        domRef[node.name].result(node1, scopeArr);
                        test = true;
                    } else if (check(domRead, node.name)) {
                        domRead[node.name].result(node1, scopeArr);
                        test = true;
                    } else if (check(domWrite, node.name)) {
                        domWrite[node.name].result(node, scopeArr);
                        test = true;
                    } else if (check(domInstall, node.name)) {
                        domInstall[node.name].result(node, scopeArr);
                        test = true;
                    } 
                }
            });
            // If test is false, it is call expression
            if (test === false && node1.type === 'CallExpression') {
                FunctionTree[scopeArr[scopeArr.length-1]].calls.push(node1.source());
            }
        }
    }
    return {'result': false};
}
/////////////////////////////// PHASE3 related END //////////////////////////////////

////////////////////////////////running part/////////////////////////////////////
var testMode = process.argv[3];
if (testMode === "printNode") {

} else {
    //var resultCodePhase0 = phase0(code1);
    //console.log(resultCodePhase0);
    //phase2 just updates summary (no need return)
    //phase2(resultCodePhase0); 
    //console.log("Result of phase2");
    //console.log(summary.FunctionTree);
    //phase3(read-write) and phase5(installs) are involved in phase2

}
///////////////////////////////////////////////////////////////////////////////////
// CHECK the TYPE whether it is CALLexpression(1) OR MEMberexpression(2)
function checkTypeCallOrMem(type) 
{
    "use strict";
    if (type === 'CallExpression') {
        return 1;
    } else if (type === 'MemberExpression') {
        return 2;
    } else {
        return 0;
    }
}
// CHECK the TYPE whether it is IDEtifier(1) OR LITeral(2)
function checkTypeIdeOrLit(type) 
{
    "use strict";
    if (type === 'Identifier') {
        return 1;
    } else if (type === 'Literal') {
        return 2;
    } else {
        return 0;
    }
}

// CHECK MINimum CONdition of CALLexpression OR MEMberexpression
function checkMinConCallOrMem(expression) {
    "use strict";
    var firstCheck=false, secondCheck=false;
    if (expression === null) {
        return false;
    }
    if (checkTypeCallOrMem(expression.type) === 1) { // CallExpression
        // check callee
        // is it CallExpression or MemberExpression?
        if (checkTypeCallOrMem(expression.callee.type) > 0) {
            firstCheck = checkMinConCallOrMem(expression.callee);
        // or Identifier then true
        } else if (checkTypeIdeOrLit(expression.callee.type) === 1) { 
            firstCheck = true;
        // if not, false..
        } else {
            if (expression.callee.type === 'ThisExpression') {
                firstCheck = true;
            } else {
                firstCheck = false;
            }
        }
        secondCheck = true;
    } else if (checkTypeCallOrMem(expression.type) === 2) {
        // check object
        if (checkTypeCallOrMem(expression.object.type) > 0) {
            firstCheck = checkMinConCallOrMem(expression.object);
        } else if (checkTypeIdeOrLit(expression.object.type) > 0) {
            firstCheck = true;
        } else {
            if (expression.object.type === 'ThisExpression') {
                firstCheck = true;
            } else {
                firstCheck = false;
            }
        }
        // check property
        if (checkTypeCallOrMem(expression.property.type) > 0) {
            secondCheck = checkMinConCallOrMem(expression.property);
        } else if (checkTypeIdeOrLit(expression.property.type) > 0) {
            secondCheck = true;
        } else {
            if (expression.property.type === 'ThisExpression') {
                secondCheck = true;
            } else {
                secondCheck = false;
            }
        }
    } else {
        if (expression.type === 'ThisExpression') {
            return true;
        } else {
            firstCheck = false;
        }
    }
    // return part
    return firstCheck && secondCheck;
}



/* Phase 0B - pulling out objectExpression from CallExpression */
// ex)  wrapper = $("<div />", {
//                               "class" : defaults.todoTask,
//                               "id" : defaults.taskId + params.id,
//                               "data" : params.id
//                             }).appendTo(parent);
// =>   var TempV0 = { "class" : ...., "id" : ... };
//      wrapper = $("<div />", TempV0).appendTo(parent);
/*
var phase0B = falafel(phase0A, function(node) {
    if (node.type === 'ObjectExpression' && node.parent.type === 'CallExpression') {
        var name = globalNameMaker.makeVariableName();
        var insertString = 'var ' + name + ' = ' + node.source() + ';\n';
        node.update(name);
        var stableNode = getStableNode(node);
        parentArr.push(stableNode);
        splitArr.push(insertString);
    }
    var index = parentArr.length;
    var gatherString = [];
    while (true) {
        if (parentArr[index-1] === node) {
            // check whether stable node is same as node, then gather gatherString
            gatherString = splitArr[index-1] + gatherString;
            parentArr.pop();
            splitArr.pop();
        } else {
            if (gatherString !== null) {
                node.update(gatherString + node.source());
            }
            break;
        }
        index--;
    }
}).toString();
*/
