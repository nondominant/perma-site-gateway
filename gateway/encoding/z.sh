#!/bin/bash

browserify reload-main.js -o bundle.js
python -m http.server
