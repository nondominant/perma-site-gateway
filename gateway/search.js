const {default: Arweave} = require('arweave');
const {default: TestWeave} = require('testweave-sdk');
const fs = require('browserify-fs');
const txid = "cH3vy6Y4Kn1fHrcPT5ykzKvVf7Je5s79RusiHQKAxnY"

const arweave = Arweave.init({
  host: 'localhost',
  port: 1984,
  protocol: 'http',
  timeout: 20000,
  logging: false,
});

//hardcoded for testing
const site1 = `
<html>
<head>
<title>NOTfacebook</title>
</head>
<body>
<h1>Welcome to NOTFacebook</h1>
</body>
</html>
`
const site4 = `
<html>
<head>
<title>NOTTinder</title>
</head>
<body>
<h1>Welcome to NOTTinder</h1>
</body>
</html>
`
const site3 = `
<html>
<head>
<title>NOTInstagram</title>
</head>
<body>
<h1>Welcome to NOTInstagram</h1>
</body>
</html>
`
const site2 = `
<html>
<head>
<title>NOTTwitter</title>
</head>
<body>
<h1>Welcome to NOTTwitter</h1>
</body>
</html>
`
const ar = [site1, site2, site3, site4];
window.go = function go(){
    const search_term = document.querySelector('input').value;
    const doc = ar[search_term.length % ar.length];
    document.getElementsByTagName("html")[0].innerHTML = doc; 
}

window.sendData = async function sendData() {
  const testWeave = await TestWeave.init(arweave);
  let data = ` 
  
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    
    <title>Motherfucking Website</title>
</head>

<body>
    <header>
        <h1>This is a motherfucking website.</h1>
        <aside>And it's fucking perfect.</aside>
    </header>
        
        <h2>Seriously, what the fuck else do you want?</h2>
        
        <p>You probably build websites and think your shit is special. You think your 13 megabyte parallax-ative home page is going to get you some fucking Awwward banner you can glue to the top corner of your site. You think your 40-pound jQuery file and 83 polyfills give IE7 a boner because it finally has box-shadow. Wrong, motherfucker. Let me describe your perfect-ass website:</p>
        
        <ul>
            <li>Shit's lightweight and loads fast</li>
            <li>Fits on all your shitty screens</li>
            <li>Looks the same in all your shitty browsers</li>
            <li>The motherfucker's accessible to every asshole that visits your site</li>
            <li>Shit's legible and gets your fucking point across (if you had one instead of just 5mb pics of hipsters drinking coffee)</li>
        </ul>
        
        <h3>Well guess what, motherfucker:</h3>
        
        <p>You. Are. Over-designing. Look at this shit. It's a motherfucking website. Why the fuck do you need to animate a fucking trendy-ass banner flag when I hover over that useless piece of shit? You spent hours on it and added 80 kilobytes to your fucking site, and some motherfucker jabbing at it on their iPad with fat sausage fingers will never see that shit. Not to mention blind people will never see that shit, but they don't see any of your shitty shit.</p>
        
        <p>You never knew it, but this is your perfect website. Here's why.</p>
        
        <h2>It's fucking lightweight</h2>
        
        <p>This entire page weighs less than the gradient-meshed facebook logo on your fucking Wordpress site. Did you seriously load 100kb of jQuery UI just so you could animate the fucking background color of a div? You loaded all 7 fontfaces of a shitty webfont just so you could say "Hi." at 100px height at the beginning of your site? You piece of shit.</p>
        
        <h2>It's responsive</h2>
        
        <p>You dumbass. You thought you needed media queries to be responsive, but no. Responsive means that it responds to whatever motherfucking screensize it's viewed on. This site doesn't care if you're on an iMac or a motherfucking Tamagotchi.</p>
        
        <h2>It fucking works</h2>
        
        <p>Look at this shit. You can read it ... that is, if you can read, motherfucker. It makes sense. It has motherfucking hierarchy. It's using HTML5 tags so you and your bitch-ass browser know what the fuck's in this fucking site. That's semantics, motherfucker.</p>
        
        <p>It has content on the fucking screen. Your site has three bylines and link to your dribbble account, but you spread it over 7 full screens and make me click some bobbing button to show me how cool the jQuery ScrollTo plugin is.</p>
        
        <p>Cross-browser compatibility? Load this motherfucker in IE6. I fucking dare you.</p>
        
        <h2>This is a website. Look at it.  You've never seen one before.</h2>
        
        <p>Like the man who's never grown out his beard has no idea what his true natural state is, you have no fucking idea what a website is. All you have ever seen are shitty skeuomorphic bastardizations of what should be text communicating a fucking message. This is a real, naked website. Look at it. It's fucking beautiful.</p>
    <form
  action="https://formspree.io/f/mpzbbjkw"
  method="POST"
>
  <label>
    Your email:
    <input type="email" name="email">
  </label>
  <label>
    Your message:
    <textarea name="message"></textarea>
  </label>
  <!-- your other form fields go here -->
  <button type="submit">Send</button>
</form>

<ul>
<li>
  <a href="#" onClick="(function(){
  const data = '<html><head><title>totally new page</title></head><body><h1>Another page</h1></body></html>';
  document.getElementsByTagName('html')[0].innerHTML = data; 
  })();return false;">navigate</a>
</li>
<li>
  <a href="#" onClick="(function(){
  const data = '<html><head><title>totally new page</title></head><body><h1>Another page</h1></body></html>';
  document.getElementsByTagName('html')[0].innerHTML = data; 
  })();return false;">navigate</a>
</li>
<li>
  <a href="#" onClick="(function(){
  alert('Hey i am calling');
  return false;
  })();return false;">alert</a>
</li>
</ul>

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
  await testWeave.mine();
  const statusAfterMine = await arweave.transactions.getStatus(dataTransaction.id);
  console.log(dataTransaction);

  console.log(statusAfterMine);

}

/*
 //uses arql endpoint, but it's throwing a malformed error
async function retrieve(){
  console.log("retrieve called");
  let goodData = await arweave.arql({
        op: "equals",
        expr1: "page",
        expr2: "about"
  });
}
*/

window.clicked = async function clicked() {
  //graphql query to send to arweave
        const data = JSON.stringify({
         query: `{
         transactions(
        tags: {
            name: "Q29udGVudC1UeXBl",
            values: "dGV4dC9odG1s"
        }
    ) {
        edges {
            node {
                id
            }
        }
    }
  }`,
        });
  //attempting to fetch transaction is from local 
  //arweave instance using fetch and graphql query
  //- but data id is empty
        const response = await fetch(
          'http://localhost:3000/graphql',
          {
            method: 'post',
            body: data2,
            headers: {
              'Content-Type': 'application/json',
              'Content-Length': data.length,
            },
          }
        );
  //stringify response and insert it into the document
        const json = await response.json();
        console.log(JSON.stringify(json.data, null, 2));
        const DOMnode = document.getElementById('output');
        const node = document.createElement('li');
        node.textContent = JSON.stringify(json.data);
        DOMnode.appendChild(node);

      };

window.getTransaction = async function getTransaction() {
        arweave.transactions.getData(txid, {decode: true, string: true}).then(data => {
        console.log(data);
        document.getElementsByTagName("html")[0].innerHTML = data; 
      });
}

