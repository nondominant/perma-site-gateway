#!/usr/bin/vim -s 

:let searchpattern = "<style\\(.*\\)>.*<.*style>"

:execute "%s/" . searchpattern . "/<style>$$$$<\\/style>\n/g"
:x

