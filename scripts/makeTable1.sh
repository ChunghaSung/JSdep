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

# generate latex table
TMPPATH=/tmp/tbl.out
echo "Name & LOC & Total Deps. & Calculated Deps. & Constraints & Time (s) \\\\" > $TMPPATH
echo "\\midrule" >> $TMPPATH

for name in $TESTS
do
    # read line info from lines.info file
    filename=../raw-data/$name/info/lines.txt
    line=`sed -n '2p' $filename`
    IFS=":" read -ra arr <<< "$line"
    TOTAL_LINE=${arr[1]}

    # combine all table
    echo "$name" >/tmp/name.out
    echo "$TOTAL_LINE" > /tmp/line.out
    totalDep=`tail -n 1 ../raw-data/$name/info/numDom.txt`
    echo "$totalDep * $totalDep" | bc >/tmp/totaldep.out
    actualDep=`wc -l < ../raw-data/$name/info/dep.txt`
    echo "$actualDep"
    actualDep=$(($actualDep / 4))
    echo $actualDep >/tmp/actualdep.out
    tail -n 1 ../raw-data/$name/info/numConstraints.txt >/tmp/cons.out
    tail -n 1 ../raw-data/$name/info/z3.time >/tmp/time.out
    
    paste -d, /tmp/name.out /tmp/line.out /tmp/totaldep.out /tmp/actualdep.out /tmp/cons.out /tmp/time.out | sed 's/,/\&/g' | tr '\n' '@' | sed 's/@/ \\\\\n/g' >>$TMPPATH

done

LOC=`awk -F\& '{sum += $2} END {print sum}' $TMPPATH`
DEPTOTAL=`awk -F\& '{sum += $3} END {print sum}' $TMPPATH`
DEPACTUAL=`awk -F\& '{sum += $4} END {print sum}' $TMPPATH`
CONST=`awk -F\& '{sum += $5} END {print sum}' $TMPPATH`
TIME=`awk -F\& '{sum += $6} END {print sum}' $TMPPATH`

NUM_LINES=`wc -l < $TMPPATH`
NUM_LINES=$(($NUM_LINES -1))

echo "\\midrule" >> $TMPPATH
echo "\\textbf{Total} & $LOC & $DEPTOTAL & $DEPACTUAL & $CONST & $TIME \\\\" >>$TMPPATH
cat $TMPPATH 
