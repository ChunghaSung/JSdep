#!/bin/bash
source exports.sh
set -u

BENCH_DIR=../benchmarks

echo "Building dependency relationships of $1"
build_deps ${BENCH_DIR}/$1

