#!/usr/bin/vim -s 

:execute "%s/<script>/\r\n<script>/g"
:execute "%s/<\\/script>/<\\/script>\r\n/g"

:execute "%s/<style>/\r\n<style>/g"
:execute "%s/<\\/style>/<\\/style>\r\n/g"

:x

