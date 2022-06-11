#!/bin/bash

browserify main.js -o bundle.js
python -m http.server
