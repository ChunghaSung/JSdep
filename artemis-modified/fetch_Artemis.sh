 #!/bin/bash        
tar xvfz Artemis-2.0.0.tar.gz
mv Artemis-2.0.0 Artemis
rm -rf Artemis/artemis-code/src
mv src Artemis/artemis-code/
