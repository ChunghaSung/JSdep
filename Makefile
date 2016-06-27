help:
	@echo "USAGE (to build dependency relationships):"
	@echo "    build-dep name=[filename]	- build dependency relationships for a specified file"
	@echo "    build-dep-all	        - build dependency relationships for all files"
	@echo "==========================================="
	@echo "USAGE (to run artemis):"
	@echo "    run-Artemis name=[filename] 	- run previous and modified version of Artemis with a specified file. It will produce new_artemis.stdout and old_artemis.stdout under artemis-result directory of each benchmark folder"
	@echo "    run-Artemis-all             - run previous and modified version of Artemis with all files. It will produce new_artemis.stdout and old_artemis.stdout under artemis-result directory of each benchmark folder"
	@echo "==========================================="
	@echo "USAGE (to make tables):"
	@echo "    fetch-data   - if you run Artemis newly, by running this command you can fetch new data from benchmarks to raw-data (Simply, data update)"
	@echo "    table1   - using data under raw-data, it will build table 1 and print it as same as table 1 in the paper"
	@echo "    table2   - using data under raw-data, it will build table 2 and print it as same as table 2 in the paper"
	@echo "    table3   - using data under raw-data, it will build table 3 and print it as same as table 3 in the paper"


SOLO_RUN = ./dep_soloRun.sh
ALL_RUN = ./dep_allRun.sh
TABLE1 = ./makeTable1.sh
TABLE2 = ./makeTable2.sh
TABLE3 = ./makeTable3.sh

build-dep:
	cd scripts && ${SOLO_RUN} $(file) 

build-dep-all:
	@echo "Building dependency relationships for all files"
	cd scripts && ${ALL_RUN} $(file) 

table1:
	@echo "make table1 (just copy the print and past to latex)"
	cd scripts && ${TABLE1} 

table2:
	@echo "make table2 (just copy the print and past to latex)"
	cd scripts && ${TABLE2} 

table3:
	@echo "make table3 (just copy the print and past to latex)"
	cd scripts && ${TABLE3} 
