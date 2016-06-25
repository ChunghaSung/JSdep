 #!/bin/bash        
node ../src/top.js $1 > ../printdebug.txt
z3 ../z3_result.smt2 > result_query.txt
node ../src/bind.js > result_query2.txt
egrep -o '[a-zA-Z_]+[0-9]*\)+$' result_query2.txt | sed -r 's/\)+//' > result_query3.txt
mv result_query3.txt result_query.txt
rm result_query2.txt
rm hashVarDebug.txt

