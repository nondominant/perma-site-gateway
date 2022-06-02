#!/usr/bin/vim -s 

:let term1 = "%s/" 
:let term2 = "<a.*=\"\\(.*\\)\">\\(.*\\)<\\/a>"
:let term3 = "/"
:let term4 = "<a href"
:let term5 = "=\"#\""
:let term6 = " onClick"
:let term7 = "=\"function()"
:let term8 = "{ arweave.transactions.getData($$\\1$$,{decode:true, string:true}).then(data => { document.getElementsByTagName('html')[0].innerHTML = data;});})();"
:let term9 = "return false;\">\\2<\\/a>"
:let term10 = "/g"

:execute "" . term1 . term2 . term3 . term4 . term5 . term6 . term7 . term8 . term9 . term10

:x
