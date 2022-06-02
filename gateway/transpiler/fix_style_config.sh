#!/usr/bin/vim -s 

:let searchpattern = "<style.*\"\\(.*\\)\">.*<.*style>"

:execute "%s/" . searchpattern . "/\\1/g"
:x

