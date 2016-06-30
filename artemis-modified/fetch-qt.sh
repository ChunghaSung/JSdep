#!/bin/bash
wget "https://download.qt.io/archive/qt/4.8/4.8.1/qt-everywhere-opensource-src-4.8.1.tar.gz"
tar xvfz qt-everywhere-opensource-src-4.8.1.tar.gz && mv qt-everywhere-opensource-src-4.8.1 qt
cd qt
echo -e 'o\nyes\n' | ./configure -prefix 'pwd' -no-webkit
make
