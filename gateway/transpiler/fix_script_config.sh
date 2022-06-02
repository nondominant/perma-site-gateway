#!/usr/bin/vim -s 

:let searchpattern = "<script.*\"\\(.*\\)\">.*<.*script>"

:execute "%s/" . searchpattern . "/\\1/g"
:x

