JSdep (DOM-DEPENDENCY ANALYSIS)
=========================
* JSdep is a tool to find DOM-event dependency of a web application using datalog constraints.

* It traverses one JavaScript file statically and finds the relationship between two events of DOMs.

* This tool includes a modified version of Artemis to show the evaluation as presented in the FSE paper (to appear).

* The characteristics of this tool
    - Static & interprocedural & context-insensitive alias anlaysis
    - This tool does not support DOM-alias anlaysis
    - This tool does not support extraction of Javascript from HTML (All JavaScripts extracted manually for the benchmarks we have)

* Structure of JSdep
<img src="https://cloud.githubusercontent.com/assets/8551376/16468537/5d6c5dd4-3e1a-11e6-8e29-0e60dc3480cf.png" width="100">
    - In this figure, all directories of the repository we have are represented with a folder, and output files are represented with a notepad icon. And, commands next to arrows are actual scripts you can use in JSdep. Mainly, there are three parts in JSdep:
    - DOM Analysis - This part contains our main analysis. It consists of 3 directories (src, z3_rules, node_modules). After installing all dependencies, when you run scripts named make build-dep with a file name or make build-dep-all, the analysis will produce 3 files (dep.txt, numConstraints.txt, z3.time) under info directory of each benchmark. Dependency result is printed in dep.txt, and analysis time of each file is recorded in z3.time. Also, the number of constraints generated is recorded in numConstraints.txt.
    - Modified Artemis - To make users check the usefulness of our analysis, we provide a Artemis modified to use the information we have. Before running Artemis you have to install it. After you install the modified version of Artemis, you can compare two versions of it. By running command make run-artemis with a file name or make run-artemis-all, it uses dep.txt under each benchmark and produces two files under artemis-result directory for each benchmark. old_artemis-.stdout is the output of previous version of Artemis, and new-_artemis.stdout is output of a modified version of Artemis which uses the information in dep.txt.
    - Raw-data - This directory is provided for users who want to make tables without any installation and running our analysis. All data have been uploaded and the structure of this directory is same as the one of benchmark. If you run commands make table1, make table2 and make table3, you can get each table used in the paper. The table will be printed on terminal and form is for latex. Therefore, if you copy the print and paste it to latex, it will show the same table as we showed in the paper. And, for those who wants to make table with new data generated, we provide one more command, make fetch-data. This command will fetch all data under benchmark to raw-data directory. Same as before, after fetching new data, you can easily make same structure tables by running make table commands.

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
    - it will make these files under info directory under each benchmark directory
        * dep.txt: dependency relationships of a specified file
        * z3.time: analysis time
        * numConstraints.txt: number of constraints generated

* make build-dep-all
    - build dependency relationships for all files
    - it will make these files under info directory under each benchmark directory
        * dep.txt: dependency relationships of a specified file
        * z3.time: analysis time
        * numConstraints.txt: number of constraints generated

* make fetch-data
    - fetch all data needed to make result tables from benchmark directory to raw-data directory

* make table1
    - build a table1 used in the FSE paper using raw-data

* make table2
    - build a table2 used in the FSE paper using raw-data

* make table3
    - build a table3 used in the FSE paper using raw-data
    - you can change the iteration number in Makefile to build a table with a different number of iterations

===== You have to install the modifed version of Artemis we provide to run these comands below =====
* make run-artemis name=[filename] iter=[iteration]
    - you have to run dependency analysis to get dep.txt first
    - run previous version of Artemis with a specified file and a specified iteration number
* make run-artemis-all iter=[iteration]	
    - you have to run dependency analysis to get dep.txt first
    - run previous version of Artemis with all files with a specified interation number



HOW TO INTERPRET THE RESULT?
=========================

If you run the program, you can see the file named dep.txt file under info directory.

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

