help:
	@echo "USAGE1 (to build dependency relationships):"
	@echo "* build-dep name=[filename] - build dependency relationships for a specified file"
	@echo "* build-dep-all - build dependency relationships for all files"
	@echo "==========================================="
	@echo "USAGE2 (to run artemis):"
	@echo "* run-artemis name=[filename] iter=[iteration] - run previous and modified version of Artemis with a specified file with specified iteration numbers. It will produce new_artemis.stdout and old_artemis.stdout under artemis-result directory of each benchmark folder"
	@echo "* run-artemis-all iter=[iteration] - run previous and modified version of Artemis with all files. It will produce new_artemis.stdout and old_artemis.stdout under artemis-result directory of each benchmark folder"
	@echo "==========================================="
	@echo "USAGE3 (to make tables):"
	@echo "* fetch-data - if you run Artemis newly, by running this command you can fetch new data from benchmarks to raw-data (Simply, data update)"
	@echo "* table1 - using data under raw-data, it will build table 1 and print it as same as table 1 in the paper"
	@echo "* table2 - using data under raw-data, it will build table 2 and print it as same as table 2 in the paper"
	@echo "* table3 - using data under raw-data, it will build table 3 and print it as same as table 3 in the paper"


SOLO_DEP = ./dep_soloRun.sh
ALL_DEP = ./dep_allRun.sh
SOLO_ARTEMIS = ./artemis_soloRun.sh
ALL_ARTEMIS = ./artemis_allRun.sh
TABLE1 = ./makeTable1.sh
TABLE2 = ./makeTable2.sh
TABLE3 = ./makeTable3.sh
FETCH = ./fetchData.sh

build-dep:
	make check 
	cd scripts && ${SOLO_DEP} $(file) 

build-dep-all:
	make check 
	@echo "Building dependency relationships for all files"
	cd scripts && ${ALL_DEP} 

run-artemis:
	cd scripts && ${SOLO_ARTEMIS} $(file) $(iter)

run-artemis-all:
	cd scripts && ${ALL_ARTEMIS} $(iter)

fetch-data:
	@echo "fetch all data from benchmarks to raw-data"
	cd scripts && ${FETCH} 

table1:
	@echo "make table1 (just copy the print and past to latex)"
	cd scripts && ${TABLE1} 

table2:
	@echo "make table2 (just copy the print and past to latex)"
	cd scripts && ${TABLE2} 

table3:
	@echo "make table3 (just copy the print and past to latex)"
	cd scripts && ${TABLE3} 500

check:
	@echo "check dependencies needed"
	which z3 > /dev/null
	which node > /dev/null

