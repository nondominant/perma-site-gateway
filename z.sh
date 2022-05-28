#!/bin/bash

browserify search.js -o bundle.js
python -m http.server
