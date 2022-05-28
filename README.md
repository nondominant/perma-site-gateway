cd into the testweave-docker directory
run "docker-compose up"
now you have a local instance of arweave running (on port 1984 i think)

z.sh is a simple bash script i used 
during development and contains only 
two commands:
--
browserify search.js -o bundle.js
python -m http.server
--

the only relevant files are index.html (served to localhost:8000)
and search.js (bundled into bundle.js)





