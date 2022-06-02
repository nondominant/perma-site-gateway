#!/usr/bin/vim -s 

:execute "%s/<script/\\r<script/g"
:execute "%s/<\\/script>/<\\/script>\\r/g"

:execute "%s/<style/\\r<style/g"
:execute "%s/<\\/style>/<\\/style>\\r/g"

:x

