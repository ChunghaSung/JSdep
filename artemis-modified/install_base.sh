 #!/bin/bash        
cd Artemis
echo "Install dependencies of Artemis"
make fetch-apt
echo "Clone qt"
git clone https://code.qt.io/qt/qt.git
cd qt
echo "Configure and Install qt"
echo -e 'o\nyes\n' | ./configure -no-webkit && make && sudo make install
