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

NUM=(100 200 300 400 500)

# generate latex table
TMPPATH=/tmp/tbl.out
echo " & & Artemis & Art. JSdep & & Artemis & Art. JSdep  & & Artemis & Art. JSdep  & & Artemis & Art. JSdep  &  & Artemis & Art. JSdep \\\\" > $TMPPATH
echo "Name & Iter. & Cov.(\%) & Cov.(\%)  & Iter. & Cov.(\%) & Cov.(\%) & Iter. & Cov.(\%) & Cov.(\%) & Iter. & Cov.(\%) & Cov.(\%) & Iter. & Cov.(\%) & Cov.(\%) \\\\" >> $TMPPATH
echo "\\midrule" >> $TMPPATH
for name in $TESTS
do
    echo "============================================="
    # extract tables first
    TABLE_NAME=/tmp/tbl_new.csv
    echo "Iterations, Runtime (s), Coverage" >$TABLE_NAME
    grep '^\#Iteration: ' ../raw-data/$name/artemis-result/new_artemis.stdout | sed 's/^\#Iteration: //' >>$TABLE_NAME
    TABLE_NAME=/tmp/tbl_old.csv
    echo "Iterations, Runtime (s), Coverage" >$TABLE_NAME
    grep '^\#Iteration: ' ../raw-data/$name/artemis-result/old_artemis.stdout | sed 's/^\#Iteration: //' >>$TABLE_NAME

    filename=tmp/tbl_new.csv
    echo "start file: $filename"
    
    # read line info from lines.info file
    filename2=../raw-data/$name/info/lines.txt
    line=`sed -n '1p' $filename2`
    IFS=":" read -ra arr <<< "$line"
    ACTUAL_LINE=${arr[1]}
    
    echo "$name" >/tmp/name.out
    for i in "${NUM[@]}"
    do
        extNum=$((10#$i + 2))
        # extract the table
        sed -n ${extNum},${extNum}p /tmp/tbl_old.csv >/tmp/old.out

        # extract the table
        sed -n ${extNum},${extNum}p /tmp/tbl_new.csv >/tmp/new.out

        echo "$i" >/tmp/iter.out

        awk -v line="$ACTUAL_LINE" -F, '{printf("%.2f", $3/line*100)}' /tmp/old.out > /tmp/old1.out && mv /tmp/old1.out /tmp/old.out
        awk -v line="$ACTUAL_LINE" -F, '{printf("%.2f" , $3/line*100)}' /tmp/new.out > /tmp/new1.out && mv /tmp/new1.out /tmp/new.out

        paste -d, /tmp/iter.out /tmp/old.out /tmp/new.out >/tmp/sum_${i}.out
    done

        paste -d, /tmp/name.out /tmp/sum_100.out  /tmp/sum_200.out /tmp/sum_300.out /tmp/sum_400.out /tmp/sum_500.out | sed 's/,/\&/g' | tr '\n' '@' | sed 's/@/ \\\\\n/g' >>$TMPPATH
done

OLD_COV1=`awk -F\& '{sum += $3} END {print sum}' $TMPPATH`
NEW_COV1=`awk -F\& '{sum += $4} END {print sum}' $TMPPATH`
OLD_COV2=`awk -F\& '{sum += $6} END {print sum}' $TMPPATH`
NEW_COV2=`awk -F\& '{sum += $7} END {print sum}' $TMPPATH`
OLD_COV3=`awk -F\& '{sum += $9} END {print sum}' $TMPPATH`
NEW_COV3=`awk -F\& '{sum += $10} END {print sum}' $TMPPATH`
OLD_COV4=`awk -F\& '{sum += $12} END {print sum}' $TMPPATH`
NEW_COV4=`awk -F\& '{sum += $13} END {print sum}' $TMPPATH`
OLD_COV5=`awk -F\& '{sum += $15} END {print sum}' $TMPPATH`
NEW_COV5=`awk -F\& '{sum += $16} END {print sum}' $TMPPATH`

NUM_LINES=`wc -l < $TMPPATH`
NUM_LINES=$(($NUM_LINES -3))

OLD_COV1=`bc <<< "scale=2; $OLD_COV1/$NUM_LINES"`
NEW_COV1=`bc <<< "scale=2; $NEW_COV1/$NUM_LINES"`
OLD_COV2=`bc <<< "scale=2; $OLD_COV2/$NUM_LINES"`
NEW_COV2=`bc <<< "scale=2; $NEW_COV2/$NUM_LINES"`
OLD_COV3=`bc <<< "scale=2; $OLD_COV3/$NUM_LINES"`
NEW_COV3=`bc <<< "scale=2; $NEW_COV3/$NUM_LINES"`
OLD_COV4=`bc <<< "scale=2; $OLD_COV4/$NUM_LINES"`
NEW_COV4=`bc <<< "scale=2; $NEW_COV4/$NUM_LINES"`
OLD_COV5=`bc <<< "scale=2; $OLD_COV5/$NUM_LINES"`
NEW_COV5=`bc <<< "scale=2; $NEW_COV5/$NUM_LINES"`

echo "\\midrule" >> $TMPPATH
echo "\\textbf{Average} & 100 & $OLD_COV1 & $NEW_COV1   & 200 & $OLD_COV2 & $NEW_COV2  & 300 & $OLD_COV3 & $NEW_COV3  & 400 & $OLD_COV4 & $NEW_COV4  & 500 & $OLD_COV5 & $NEW_COV5 \\\\" >>$TMPPATH

cat $TMPPATH 
