#!/bin/bash

cp index.html backup.index.html

#add spaces 
./add_spaces.sh index.html
#create config
cat index.html | grep -a "style" > o_temp
#fix config
./fix_style_config.sh o_temp 2>&1 > error_style.log
#insert markers
./markers_style.sh index.html
#combine
python combine_style.py

cat done_style.html > index.html

#add spaces 
./add_spaces.sh index.html
#create config
cat index.html | grep -a "script" >  o_temp
#fix config
./fix_script_config.sh o_temp 2>&1 > error_config.log
#insert markers
./markers_script.sh index.html
#combine
python combine_script.py

cat done_script.html > index.html

#replacing a tags with inline function call to arweave
./replace_button.sh index.html

python url_to_id.py

cp index.html transpile.html

mv backup.index.html index.html

