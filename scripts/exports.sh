# Location of artemis binary
ARTEMIS=artemis

TIME="`which time` -f %e"

build_deps() {
    if [ -z ${1:-} ]
    then
        echo "Frst argument should be directory file to test"
        exit 1
    fi

    if [ ! -d $1 ]
    then
        echo "First argument must be a directory to test"
        echo "you passed: $1"
        exit 1
    fi

    DIRNAME=$1
    $TIME ./makeDeps.sh ${DIRNAME}/index.js 2>${DIRNAME}/info/z3.time
    mv ./result_query.txt ${DIRNAME}/info/dep.txt
    mv ./numConstraints.txt ${DIRNAME}/info/numConstraints.txt
}

run_artemis_old() {
    if [ -z ${1:-} ]
    then
        echo "First argument should be directory to test"
        exit
    fi

    if [ ! -d $1 ]
    then
        echo "First argument must be a directory to test"
        echo "you passed: $1"
        exit
    fi

    if [ -z ${2:-} ]
    then
        echo "run_artemis(): second argument should be number of iterations"
        exit
    fi

    # move in the deps file so artemis can find it
    DIRNAME=$1
    depFile=${DIRNAME}/dep.txt
    if [ ! -f $depFile ]
    then
        echo "depFile not found: $depFile"
        exit
    fi
    HTMLFILE=${DIRNAME}/index.html
    #make the path absolute and append the file:/// thing for webkit
    mkdir -p ${DIRNAME}/result
    BIG_PATH="file:///`realpath $HTMLFILE`"
    cd ~/Artemis-2.0.0

    echo "running: $ARTEMIS $BIG_PATH -i $2 -q 0"
    for ((i=4;i<=$REP;i++));
    do
        echo "$i's repeatation"
#OUT=${DIRNAME}/result/artemis_old_no_$i.stdout
#echo "old without prioritization"
#$ARTEMIS $BIG_PATH -i $2 -q 0 --coverage-report stdout 1>"${OUT}"
        echo "old with prioritization"
        OUT=${DIRNAME}/result/artemis_old_yes_$i.stdout
#$ARTEMIS $BIG_PATH -i $2 -q 0 --coverage-report stdout --strategy-priority all 1>"${OUT}"
        $ARTEMIS $BIG_PATH -i $2 -q 0 --strategy-priority all 1>"${OUT}"
    done

    cd ../web-project/project_test/

    # build the table
    for ((i=4;i<=$REP;i++));
    do
#TABLE_NAME=${DIRNAME}/result/tbl_old_no_$i.csv
#echo "Iterations,Runtime (s),Coverage" >$TABLE_NAME
#grep '^\#Iteration: ' ${DIRNAME}/result/artemis_old_no_$i.stdout | sed 's/^\#Iteration: //' >>$TABLE_NAME
        TABLE_NAME=${DIRNAME}/result/tbl_old_yes_$i.csv
        echo "Iterations,Runtime (s),Coverage" >$TABLE_NAME
        grep '^\#Iteration: ' ${DIRNAME}/result/artemis_old_yes_$i.stdout | sed 's/^\#Iteration: //' >>$TABLE_NAME
        TABLE_NAME=${DIRNAME}/result/tbl_time_old_yes_$i.csv
        echo "Iterations,Total time (s), Calculate Time" >$TABLE_NAME
        grep '^\#TimeTakes: ' ${DIRNAME}/result/artemis_old_yes_$i.stdout | sed 's/^\#TimeTakes: //' >>$TABLE_NAME
    done
}
run_artemis_new() {
    if [ -z ${1:-} ]
    then
        echo "First argument should be directory to test"
        exit
    fi

    if [ ! -d $1 ]
    then
        echo "First argument must be a directory to test"
        echo "you passed: $1"
        exit
    fi

    if [ -z ${2:-} ]
    then
        echo "run_artemis(): second argument should be number of iterations"
        exit
    fi

    # move in the deps file so artemis can find it
    DIRNAME=$1
    depFile=${DIRNAME}/dep.txt
    if [ ! -f $depFile ]
    then
        echo "depFile not found: $depFile"
        exit
    fi
    HTMLFILE=${DIRNAME}/index.html
    #make the path absolute and append the file:/// thing for webkit
    mkdir -p ${DIRNAME}/result
    BIG_PATH="file:///`realpath $HTMLFILE`"
    cp $depFile ~/Artemis-2.0.0/dep.txt
    cd ~/Artemis-2.0.0

    echo "running: $ARTEMIS $BIG_PATH -i $2 -q 1"
    for ((i=4;i<=$REP;i++));
    do
        echo "$i's repeatation"
        OUT=${DIRNAME}/result/artemis_new_no_$i.stdout
        echo "new without prioritization"
        $ARTEMIS $BIG_PATH -i $2 -q 1 1>"${OUT}"
#$ARTEMIS $BIG_PATH -i $2 -q 1 --coverage-report stdout 1>"${OUT}"
#OUT=${DIRNAME}/result/artemis_new_yes_$i.stdout
#echo "new with prioritization"
#$ARTEMIS $BIG_PATH -i $2 -q 1 --coverage-report stdout --strategy-priority all 1>"${OUT}" 
    done

    cd ../web-project/project_test/

    # build the table
    for ((i=4;i<=$REP;i++));
    do
        TABLE_NAME=${DIRNAME}/result/tbl_new_no_$i.csv
        TABLE_NAME2=${DIRNAME}/result/tbl_block_$i.csv
        echo "Iterations,Runtime (s),Coverage" >$TABLE_NAME
        grep '^\#Iteration: ' ${DIRNAME}/result/artemis_new_no_$i.stdout | sed 's/^\#Iteration: //' >>$TABLE_NAME
        echo "Iterations,Runtime (s),Coverage" >$TABLE_NAME2
        grep '^\#Iteration2: ' ${DIRNAME}/result/artemis_new_no_$i.stdout | sed 's/^\#Iteration2: //' >$TABLE_NAME2
        TABLE_NAME=${DIRNAME}/result/tbl_time_new_no_$i.csv
        echo "Iterations,Total time (s), Calculate Time" >$TABLE_NAME
        grep '^\#TimeTakes: ' ${DIRNAME}/result/artemis_new_no_$i.stdout | sed 's/^\#TimeTakes: //' >>$TABLE_NAME
#TABLE_NAME=${DIRNAME}/result/tbl_new_yes_$i.csv
#echo "Iterations,Runtime (s),Coverage" >$TABLE_NAME
#grep '^\#Iteration: ' ${DIRNAME}/result/artemis_new_yes_$i.stdout | sed 's/^\#Iteration: //' >>$TABLE_NAME
    done
}
