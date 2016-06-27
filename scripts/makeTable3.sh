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

if [ -z ${1:-} ]
then
echo "Frst argument should be iterations to pick (500 in the paper)"
exit 1
fi

extNum=$(($1 + 2))

# generate latex table
TMPPATH=/tmp/tbl.out
echo "Name & Iter. & Redund. Checked & Redund. Found & Ratio (\%) \\\\" > $TMPPATH
echo "\\midrule" >> $TMPPATH

for name in $TESTS
do
    # extract tables first
    TABLE_NAME=/tmp/tbl_block.csv
    echo "Iterations, Runtime (s), Coverage" >$TABLE_NAME
    grep '^\#Iteration2: ' ../raw-data/$name/artemis-result/new_artemis.stdout | sed 's/^\#Iteration2: //' >>$TABLE_NAME

    # combine all table
    filename=/tmp/tbl_block.csv
    echo "$name" >/tmp/name.out
    echo "$1" >/tmp/iter.out
    sed -n ${extNum},${extNum}p $filename >/tmp/block.out

    awk -F, '{printf("%d, %d, %.2f", $2, $4, $4/$2*100 )}' /tmp/block.out > /tmp/block1.out && mv /tmp/block1.out /tmp/block.out
    
    paste -d, /tmp/name.out /tmp/iter.out /tmp/block.out | sed 's/,/\&/g' | tr '\n' '@' | sed 's/@/ \\\\\n/g' >>$TMPPATH

done

TOTAL_TRY=`awk -F\& '{sum += $3} END {print sum}' $TMPPATH`
TOTAL_BLOCK=`awk -F\& '{sum += $4} END {print sum}' $TMPPATH`
AVG_TRY=`awk -F\& '{sum += $3} END {print sum}' $TMPPATH`
AVG_BLOCK=`awk -F\& '{sum += $4} END {print sum}' $TMPPATH`
PERCENT=`awk -F\& '{sum += $5} END {print sum}' $TMPPATH`

NUM_LINES=`wc -l < $TMPPATH`
NUM_LINES=$(($NUM_LINES -2))

PERCENT=`bc <<< "scale=2; $PERCENT/$NUM_LINES"`
AVG_TRY=`bc <<< "$AVG_TRY/$NUM_LINES"`
AVG_BLOCK=`bc <<< "$AVG_BLOCK/$NUM_LINES"`

echo "\\midrule" >> $TMPPATH

echo "\\textbf{Average} &  & $AVG_TRY & $AVG_BLOCK & $PERCENT \\\\" >>$TMPPATH
cat $TMPPATH 
