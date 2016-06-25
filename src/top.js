var fs = require('fs');
var fileName = process.argv[2];
var code = fs.readFileSync(fileName).toString();

var stage1 = require('./stage1');
var stage2 = require('./stage2');
var cfgRelated = require('./cfg');

// run stage1 and make normalized code
var normalized = stage1.phase0(code);
// buid CFG using JS_WALA
var cfg = cfgRelated.makeCFG(normalized);
// build dominator tree using JS_WALA
cfgRelated.buildDominatorTrees(cfg, true);

// Print all facts by traversing CFG
stage2.phase(cfg);
