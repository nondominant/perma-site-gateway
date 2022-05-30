#!/bin/bash

browserify search.js -o bundle.js
browserify page2.js -o page2bundle.js
browserify page3.js -o page3bundle.js
browserify page4.js -o page4bundle.js
python -m http.server
