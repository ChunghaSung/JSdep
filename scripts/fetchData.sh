#!/bin/bash

TESTS="case1
case2
case3
case4
frog
cosmos
hanoi
flipflop
sokoban
wormy
chinabox
3dmodel
cubuild
pearlski
speedyeater
gallony
fullhouse
ball_pool
lady
harehound
match"

for name in $TESTS
do
    cp ../benchmarks/$name/info/numConstraints.txt ../raw-data/$name/info/numConstraints.txt
    cp ../benchmarks/$name/info/z3.time ../raw-data/$name/info/z3.time
    cp ../benchmarks/$name/info/dep.txt ../raw-data/$name/info/dep.txt
    cp ../benchmarks/$name/artemis-result/new_artemis.stdout ../raw-data/$name/artemis-result/new_artemis.stdout
    cp ../benchmarks/$name/artemis-result/old_artemis.stdout ../raw-data/$name/artemis-result/old_artemis.stdout

done
