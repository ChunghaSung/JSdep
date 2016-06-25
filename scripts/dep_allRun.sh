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
    ./dep_soloRun.sh $name
done
