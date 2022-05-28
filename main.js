const {default: Arweave} = require('arweave');
const {default: TestWeave} = require('testweave-sdk');

const arweave = Arweave.init({
  host: 'localhost',
  port: 1984,
  protocol: 'http',
  timeout: 20000,
  logging: false,
});

async function entry(){
  const testWeave = await TestWeave.init(arweave);
  const data = `<html>
  <head> 
  <meta charset="UTF-8">
  <title>hosted on arweave</title>
  </head>
  <body>
  Welcome to the decentralized web
  </body>
  </html>`
  const dataTransaction = await arweave.createTransaction({
    data,
  }, testWeave.rootJWK)

  //testWeave.rootJWK returns test wallet with 10000000 and
  //addres is MlV6DeOtRmakDOf6vgOBlif795tcWimgyPsYYNQ8q1Y

  //add tags
  dataTransaction.addTag('App-Name', 'Silkroad');
  dataTransaction.addTag('page', 'about');

  //sign transaction
  await arweave.transactions.sign(dataTransaction, testWeave.rootJWK);
  const statusBeforePost = await arweave.transactions.getStatus(dataTransaction.id);
  console.log(statusBeforePost);

  await arweave.transactions.post(dataTransaction);
  const statusAfterPost = await arweave.transactions.getStatus(dataTransaction.id)
  console.log(statusAfterPost);

  //instantly mine block !!
  await testWeave.mine();
  const statusAfterMine = await arweave.transactions.getStatus(dataTransaction.id);
  console.log(dataTransaction);

  console.log(statusAfterMine);

  arweave.wallets.generate().then((key) => {
    console.log(key);
  });
  let key = await arweave.wallets.generate();
  let transactionA = await arweave.createTransaction({
    data: 'hello'
  }, key);
  console.log(transactionA);
}
async function retrieve(){
  console.log("retrieve called");
  let goodData = await arweave.arql({
        op: "equals",
        expr1: "page",
        expr2: "about"
  });
}
entry();

