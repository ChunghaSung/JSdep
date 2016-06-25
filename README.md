LICENSE
=========================
MIT License


DOM-DEPENDENCY ANALYSIS
=========================
This is the tool to find DOM-event dependency using datalog constraints.

It traverses one JavaScript file statically and finds the relationship between two events of DOMs.

This tool includes a modified version of Artemis to show the evaluation as presented in the FSE paper (to appear).

Also, there is a virtual disk image with configurations fully. If you contact to Chungha Sung (sch8906/at/vt/edu), we will send you a disk image).


Contributors
=========================
The following people have contributed to the this appliacation and the paper:

* Chungha Sung (sch8906/at/vt/edu)
* Markus Kusano
* Nishant Sinha
* Chao Wang


PROGRAM DEPENDENCIES 
=========================
0. Environment

    * We only tested this program on Ubuntu 12.04
    * We haven't checked it with other Ubuntu versions

1. To run only static analysis to run DOM-dependency relationships,
    it needs these dependencies:

    * z3 (https://github.com/Z3Prover/z3), any version (tested with 4.4.1).
    * nodejs (To install this, type "sudo apt-get install nodejs")

2. To test with Artemis, you have to install a modified version of Artemis first.

    * You can follow the instruction under Artemis-2.0.0 directory to install it. 
    * You have to use the version under this directory because this version is modified to compare the previous version of Artemis and the modified version of Artemis which uses dependency relationships of our program.


USAGE
=========================
  ./runTest.sh <input-JS-file>

  It will print the result at the file named "result\_query3.txt".

  The input JS file should be located at the same directory where runTest.sh locates.

  You can test it with example bechmakrs which are located in benchmarks/forTest/


HOW TO INTERPRET THE RESULT?
=========================

If you run the program, you can see the file named "result\_query3.txt" file.

There are lines of text, and each depedency relationships consist of 4 lines of text.

First and Second line indicate the name of DOM, and third and fourth line indicate the type of event.

For example, if the file content is 
    1    test1
    2    click
    3    test2
    4    mousemove

test1 and test2 are name of DOM nodes and click and mousemove is type of events for each DOM.

The meaning of these four lines is mousemove of test2 depends on click of test1.

Each four lines are related (e.g. 1~4, 5~8 ...)





