const {default: Arweave} = require('arweave');
const {default: TestWeave} = require('testweave-sdk');
const fs = require('browserify-fs');
const arweave = Arweave.init({
  host: 'localhost',
  port: 1984,
  protocol: 'http',
  timeout: 20000,
  logging: false,
});

window.p3 = async function p3() {
  const testWeave = await TestWeave.init(arweave);
  let data = ` 
 
<!doctype html>
<html>
<head>
  <!-- new server -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="Description" content="Txti is a free service that lets you create the fastest, simplest, most shareable web pages on the internet using any phone, tablet, or computer you have.">
    <meta name="author" content="Barry T. Smith">
    
    <meta property="og:url" content="http://txti.es">
    <meta property="og:title" content="txti - Fast web pages for everybody">
    <meta property="og:image" content="http://txti.es/favicon-196x196.png">
    <meta property="og:site_name" content="txti">
    <meta property="og:description" content="Txti is a free service that lets you create the fastest, simplest, most shareable web pages on the internet using any phone, tablet, or computer you have.">
    
    <meta name="twitter:card" content="summary">
    <meta name="twitter:site" content="@txties">
    <meta name="twitter:creator" content="@thebarrytone">
    <meta name="twitter:title" content="txti - Fast web pages for everybody">
    <meta name="twitter:description" content="Txti is a free service that lets you create the fastest, simplest, most shareable web pages on the internet using any phone, tablet, or computer you have.">
    
    <title>txti - Fast web pages for everybody</title>
    
    <link rel="shortcut icon" href="/favicon.ico">
    <link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="60x60" href="/apple-touch-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png">
    <link rel="icon" type="image/png" href="/favicon-196x196.png" sizes="196x196">
    <link rel="icon" type="image/png" href="/favicon-160x160.png" sizes="160x160">
    <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96">
    <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16">
    <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32">
    <meta name="msapplication-TileColor" content="#9f00a7">
    <meta name="msapplication-TileImage" content="/mstile-144x144.png">
    <meta name="msapplication-config" content="/browserconfig.xml">
    
    <link href="/css/styles.min.css" rel="stylesheet" type="text/css">
</head>
<body>
    
<h1><a href="http://txti.es">txti</a></h1>
<p>Fast web pages for everybody.</p>
<a href="http://txti.es/about">What is txti?</a> | <a href="http://txti.es/how">How to use txti</a>
<h2>Create a txti</h2>
<form id="create-a-txti" method="post" action="http://txti.es">
	<label for="content-input" >Content (required)</label>
	<textarea class="text-input" id="content-input" name="content"></textarea>
	<input type="hidden" name="form_level" value="1">
	<p>By continuing, you agree to the <a href="http://txti.es/terms">terms of service.</a></p>
	<label for="username" class="nope">If you are human, leave this field blank (required):</label><input type="text" id="username" class="nope" name="username">
	<input type="submit" id="submit" name="submit" value="Save and done">
	 or <input type="submit" id="increase_form_level" name="increase_form_level" value="Show more options">
</form>
    
</body>
</html> 
    `;
  const dataTransaction = await arweave.createTransaction({
    data,
  }, testWeave.rootJWK)

  //testWeave.rootJWK returns test wallet with 10000000 and
  //addres is MlV6DeOtRmakDOf6vgOBlif795tcWimgyPsYYNQ8q1Y

  //add tags -- these are used when querying data
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
  console.log("about to mine");
  await testWeave.mine();
  console.log("after mined");
  const statusAfterMine = await arweave.transactions.getStatus(dataTransaction.id);
  console.log(dataTransaction);
  console.log(statusAfterMine);
}


