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

run_artemis() {
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
    depFile=${DIRNAME}/info/dep.txt
    if [ ! -f $depFile ]
    then
        echo "depFile not found: $depFile"
        exit
    fi
    HTMLFILE=${DIRNAME}/index.html
    #make the path absolute and append the file:/// thing for webkit
    mkdir -p ${DIRNAME}/artemis-result
    BIG_PATH="file:///`realpath $HTMLFILE`"
    cd ../artemis-modified

    echo "running old version: $ARTEMIS $BIG_PATH -i $2 -q 0"
    OUT=${DIRNAME}/artemis-result/old_artemis.stdout
    $ARTEMIS $BIG_PATH -i $2 -q 0 --strategy-priority all 1>"${OUT}"

    cp $depFile Artemis/dep.txt
    echo "running new version: $ARTEMIS $BIG_PATH -i $2 -q 1"
    OUT=${DIRNAME}/artemis-result/new_artemis.stdout
    $ARTEMIS $BIG_PATH -i $2 -q 1 1>"${OUT}"
}
