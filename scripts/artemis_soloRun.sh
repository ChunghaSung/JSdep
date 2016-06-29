#!/bin/bash
source exports.sh
set -u

BENCH_DIR=../benchmarks

echo "========================================================="
echo "run old and new artemis with a file $1 and a iteration $2"

run_artemis ${BENCH_DIR}/$1 $2

