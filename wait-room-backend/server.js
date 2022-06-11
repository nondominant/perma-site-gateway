const express = require('express');

const app = express();

app.get('/', (req, res) => {
  console.log("get endpoint hit");
  res.send(200);
});
//================================
//gallery website
//================================

function success(res, res, next) {
    res.send("OOOOH NOO")
}

function failure(res, res, next) {
    res.send("ok bud")
}

const check = [success, failure];
app.get('/gallery', check, (req, res, next) => {
  console.log('gallery');
  res.send("200 OK");
});

//===============================

const port = 5000;
app.listen(port, () => {
  console.log("listening on port ", port);
});
