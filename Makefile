help:
	@echo "USAGE:"
	@echo "    build-dep name=[filename]	- build dependency relationships for a specified file"
	@echo "    build-dep-all	        - build dependency relationships for all files"
	@echo "    run-old-Artemis name=[filename] 	- run previous version of Artemis with a specified file"
	@echo "    run-dep-Artemis name=[filename] 	- run modified version of Artemis with a specified file"
	@echo "    run-old-Artemis-all 	- run previous version of Artemis with all files"
	@echo "    run-dep-Artemis-all 	- run modified version of Artemis with all files"
	@echo "    run-Artemis name=[filename] 	- run previous and modified version of Artemis with a specified file"
	@echo "    run-Artemis-all             - run previous and modified version of Artemis with all files"


SOLO_RUN = ./dep_soloRun.sh
ALL_RUN = ./dep_allRun.sh

build-dep:
	cd scripts && ${SOLO_RUN} $(file) 

build-dep-all:
	@echo "Building dependency relationships for all files"
	cd scripts && ${ALL_RUN} $(file) 
