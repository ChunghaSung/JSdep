BENCHMARKS
============
This directory includes all benchmarks used in the paper.


LIST OF BENCHMARKS
============
* self-made(4): case1, case2, case3, case4
* real-examples(17): frog, cosmos, hanoi, flipflop, sokoban, wormy, chinabox, 3dmodel, cubuild, pearlski, speedyeater, gallony, fullhouse, ballpool, lady, harehound, match


STRUCTURE OF EACH DIRECTORY
============
* Benchmark name
    * index.html: html file
    * index.js: javascript code extracted from index.html
    * info: includes
        * lines.txt: lines of code
        * numDom.txt: number of DOMs in the file

* If you run static-dom-analysis, it will produce these files under info directory for each file
    * dep.txt: dependency relationship
    * z3.time: analysis time for doing this analysis
    * numConstraints.txt: number of constraints generated
