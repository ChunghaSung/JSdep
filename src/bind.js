var fs = require('fs');
function readResult()
{
    "use strict";
    var buffer = fs.readFileSync('hashVarDebug.txt').toString();
    // read result file
    var buffer2 = fs.readFileSync('result_query.txt').toString();
    // str = str.replace(/abc/g, '');
    var eachLine = buffer.split("\n");
    for (var i=1; i<eachLine.length; i++) {
        var phase = eachLine[i].split(":");
        var regEx = new RegExp(phase[0], 'g');
        buffer2 = buffer2.replace(regEx, phase[1]);
    }
    console.log(buffer2);
}
readResult();



