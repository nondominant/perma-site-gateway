const express = require('express');
const cors = require('cors');
const {json, urlencoded} = express;

const app = express();
app.use(cors())
//app.use(json);
//app.use(urlencoded({ extended: true}))

app.post('/mirror', (req, res) => {
  console.log("hit");
  console.log(req.body);
  res.send(req.body);
});

app.get('/', (req, res) => {
  console.log("get endpoint hit");
  res.send(200);
});

const port = 5000;
app.listen(`${port}`, () => {
  console.log("listening on port ", port);
});
