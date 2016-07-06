MODIFIED version of Artemis
=========================
* This directory includes the Artemis version 2.0.0 (this is an official release in https://github.com/cs-au-dk/Artemis) and source code (`src` directory) modified by ours to use dependency information.

* Modification part tagged by "// MODIFIED by CH" in src directory.

1. You have to run the command to extract Artemis official version and change the src directory:

  ``./fetch_Artemis.sh``

2. After running this command, run 

  ``./install_base.sh``
  
  to install dependencies and qt compitible versions.

  This will fetch and compile a compatible Qt version and place it in the ``qt/`` folder under Artemis.

  
* Below Instructions are almost same as INSTALL under Artemis directory.

3. And then set QTDIR and PATH

      export QTDIR=`<qtpath>`
      export PATH=$QTDIR/bin:$PATH

    where `<qtpath>` is the QT 4.8 installation directory, either
    the one provided by your distribution or the ``qt/`` folder 
    from step 0.

    On Ubuntu this is /usr/share/qt4 or /usr/
   
    After setting this, you can check your qt version using the command ``qmake --version``
    (if qmake is not present then Qt is not installed)

4. Then, build and install Artemis by typping with root privilege

    ``cd Artemis && make install``

  Note that QTDIR and PATH are set correctly with root privilege. 
  And gcc version has to be 4.7 or 4.6 as we checked.

5. Add the instrumented WebKit library to your library path

      export LD_LIBRARY_PATH=`<path>`/WebKit/WebKitBuild/Release/lib  

    where `<path>` is the root directory of the Artemis repository.

    You will need to add this environment variable every time you
    subsequently wish to use Artemis.

* It may take 1~2 hours to complete Artemis and dependencies for it depending on systems.

