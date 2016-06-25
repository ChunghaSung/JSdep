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
    rm ../benchmarks/$name/info/numConstraints.txt
    rm ../benchmarks/$name/info/z3.time
    rm ../benchmarks/$name/info/dep.txt
done
