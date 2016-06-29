JSdep (DOM-DEPENDENCY ANALYSIS)
=========================
* JSdep is the tool to find DOM-event dependency of a web application using datalog constraints.

* It traverses one JavaScript file statically and finds the relationship between two events of DOMs.

* This tool includes a modified version of Artemis to show the evaluation as presented in the FSE paper (to appear).

* The characteristics of this tool
    - Static & interprocedural & context-insensitive alias anlaysis
    - This tool does not support DOM-alias anlaysis
    - This tool does not support extraction of Javascript from HTML (All JavaScripts extracted manually for the benchmarks we have)


Contributors
=========================
The following people have contributed to the this appliacation and the paper:

* Chungha Sung (sch8906/at/vt/edu)
* Markus Kusano (mukusano/at/vt/edu)
* Nishant Sinha
* Chao Wang (chaowang/at/vt/edu)


PROGRAM DEPENDENCIES 
=========================
0. Environment

    * We only tested this program on Ubuntu 12.04
    * We haven't checked it with other Ubuntu versions

1. To run only static analysis to run DOM-dependency relationships,
    it needs these dependencies:

    * Z3 (https://github.com/Z3Prover/z3), any version (tested with 4.4.1).
    * nodejs (To install this, type "sudo apt-get install nodejs")

2. To test with Artemis, you have to install a modified version of Artemis first.

    * You can follow the instruction under artemis-modified directory to install it (it sometimes hard to install correctly, however due to the size limitation we cannot provide fully compiled version).
    * You have to use the version we provide because this version is modified to compare the previous version of Artemis and the modified version of Artemis which uses dependency relationships of our program.


USAGE
=========================
* make build-dep name=[filename]
    - build dependency relationships for a specified file
    - it will make these files under "info" directory under each file directory
        * dep.txt: dependency relationships of a specified file
        * z3.time: analysis time
        * numConstraints.txt: number of constraints generated

* make build-dep-all
    - build dependency relationships for all files
    - it will make these files under "info" directory under each file directory
        * dep.txt: dependency relationships of a specified file
        * z3.time: analysis time
        * numConstraints.txt: number of constraints generated

* make table1
    - build a table1 used in the FSE paper using raw-data

* make table2
    - build a table2 used in the FSE paper using raw-data

* make table3
    - build a table3 used in the FSE paper using raw-data

===== You have to install the modifed version of Artemis we provide to run these comands below =====
* make run-artemis name=[filename] iter=[iteration]
    - run previous version of Artemis with a specified file and a specified iteration number
* make run-artemis-all iter=[iteration]	
    - run previous version of Artemis with all files with a specified interation number



HOW TO INTERPRET THE RESULT?
=========================

If you run the program, you can see the file named "dep.txt" file under "info" directory.

There are lines of text, and each depedency relationships consist of 4 lines of text.

First and Second line indicate the name of DOM, and third and fourth line indicate the type of event.

For example, if the file content is 
    1    dom1
    2    click
    3    dom2
    4    mousemove

dom1 and dom2 are name of DOM nodes and click and mousemove are the type of events for each DOM.

The meaning of these four lines is mousemove of test2 depends on click of test1.

Each four lines are related (e.g. 1~4, 5~8 ...)





