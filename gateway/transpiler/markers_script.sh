#!/usr/bin/vim -s 

:function! GetContents()
  :let @0 = join(readfile(expand("~/Workspace/arweave/gateway/transpiler/target.js"), "\n"))
  :let clip = getreg(0)
  :return clip
:endfunction

:let searchpattern = "<script\\(.*\\)>.*<.*script>"

:execute "%s/" . searchpattern . "/<script>$$$$<\\/script>/g"
:x

