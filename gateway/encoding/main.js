const {default: Arweave} = require('arweave');
const {default: TestWeave} = require('testweave-sdk');
const fs = require('browserify-fs');
const txid = "s6aYcwNhmv-KRm6Xw3oGslR0vZlwajuj8Yl_zgpKSeM"
const arweave = Arweave.init({
  host: 'localhost',
  port: 1984,
  protocol: 'http',
  timeout: 20000,
  logging: false,
});


window.load = async function load() {
  console.log("loading");
          arweave.transactions.getData(txid, {decode: true, string: true}).then(data => {
            document.createElement('script');
          fetch(
            'http://localhost:5000/mirror',
            {
              method: 'post',
              body: data,
              headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length,
              },
            }
          );
      });
}

window.deployHome = async function deployHome() {
  const testWeave = await TestWeave.init(arweave);
  let data = ` 
<html>
  <head>

  </head>

  <body>
<h2>Web 2 gateway to decentralized sites</h2>
<input type="text" id="search" placeholder="enter site name \'blog.ar\'" />
<a id="aG9tZQ" href="#">Home </a>
<a id="Y29udGFjdA" href="#">Home </a>
<a id="YWJvdXQ" href="#">Home </a>

<ul id="output"></ul>

<footer>
	<p>
		Websites stored on
    <a target="_blank" href="https://arweave.org">Arweave</a>
    last forever. This website can get taken down but they'll still be there
	</p>
</footer>

<!--replace anchor tags in browser -->
<script>
  //arweave function call
function navigate(id){
arweave.transactions.getData(id,{decode: true, string:true}).then(
data => {
document.getElementsByTagName('html')[0].innerHTML = data;
});
};
//get variables (id's), from tag search
let pages = ["aG9tZQ","Y29udGFjdA","YWJvdXQ"]
window.tagQuery = async function tagQuery(page) {
    const root = "domain"
  //graphql query to send to arweave
        const data = JSON.stringify({
         query: \`{
         transactions(
         sort: HEIGHT_DESC,
        tags: {
            name: "cGFnZQ",
           values: "\${page}",
           name: "cm9vdA",
           values: "ZG9tYWlu"
        }
    ) {
        edges {
            node {
                id
            }
        }
    }
  }\`,
        });
  //attempting to fetch transaction is from local 
  //arweave instance using fetch and graphql query
  //- but data id is empty
        const response = await fetch(
          'http://localhost:3000/graphql',
          {
            method: 'post',
            body: data,
            headers: {
              'Content-Type': 'application/json',
              'Content-Length': data.length,
            },
          }
        );
  //stringify response and return most recent txid
        const json = await response.json();
        console.log(JSON.stringify(json.data, null, 2));
        //get transaction id's
        const idArray = json.data.transactions.edges.map(x => x.node.id);
        return idArray[0]
};

let txidArray =  (async() => 
let pages = ["aG9tZQ","Y29udGFjdA","YWJvdXQ"]
     await Promise.all(
        pages.map(async(x, i) => 
            ({ "page": pages[i], "id": await window.tagQuery(x)})
          )
      )
  )();

  //insert onclick attribute on all <a> tags
  Array.from(document.querySelectorAll('a')).forEach(link => {
      const index = pages.findIndex((element) => element == link.getAttribute('id'));
      const txid = txidArray[index];
      link.setAttribute('href', '#');
      link.setAttribute("onclick", \`navigate(\${txid})\`);
    });
</script>
  </body>
</html>
    `;

  const dataTransaction = await arweave.createTransaction({
    data,
  }, testWeave.rootJWK)

  //testWeave.rootJWK returns test wallet with 10000000 and
  //addres is MlV6DeOtRmakDOf6vgOBlif795tcWimgyPsYYNQ8q1Y

  //add tags -- these are used when querying data
  dataTransaction.addTag('root', 'domain');
  dataTransaction.addTag('page', 'home');
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


window.deployAbout = async function deployAbout() {
  const testWeave = await TestWeave.init(arweave);
  let data = ` 
<html>
  <head>

  </head>

  <body>
<h2>About</h2>
<input type="text" id="search" placeholder="enter site name \'blog.ar\'" />
<a id="home" href="#">Home </a>
<a id="about" href="#">Home </a>
<a id="contact" href="#">Home </a>

<ul id="output"></ul>

<footer>
	<p>
		Websites stored on
    <a target="_blank" href="https://arweave.org">Arweave</a>
    last forever. This website can get taken down but they'll still be there
	</p>
</footer>

<!--replace anchor tags in browser -->
<script>
  //arweave function call
function navigate(id){
arweave.transactions.getData(id,{decode: true, string:true}).then(
data => {
document.getElementsByTagName('html')[0].innerHTML = data;
});
};
//get variables (id's), from tag search
let pages = ["aG9tZQ","Y29udGFjdA","YWJvdXQ"]
window.tagQuery = async function tagQuery(page) {
    const root = "domain"
  //graphql query to send to arweave
        const data = JSON.stringify({
         query: \`{
         transactions(
         sort: HEIGHT_DESC,
        tags: {
            name: "cGFnZQ",
           values: "\${page}",
           name: "cm9vdA",
           values: "ZG9tYWlu"
        }
    ) {
        edges {
            node {
                id
            }
        }
    }
  }\`,
        });
  //attempting to fetch transaction is from local 
  //arweave instance using fetch and graphql query
  //- but data id is empty
        const response = await fetch(
          'http://localhost:3000/graphql',
          {
            method: 'post',
            body: data,
            headers: {
              'Content-Type': 'application/json',
              'Content-Length': data.length,
            },
          }
        );
  //stringify response and return most recent txid
        const json = await response.json();
        console.log(JSON.stringify(json.data, null, 2));
        //get transaction id's
        const idArray = json.data.transactions.edges.map(x => x.node.id);
        return idArray[0]
};

let txidArray =  (async() => 
let pages = ["aG9tZQ","Y29udGFjdA","YWJvdXQ"]
     await Promise.all(
        pages.map(async(x, i) => 
            ({ "page": pages[i], "id": await window.tagQuery(x)})
          )
      )
  )();

  //insert onclick attribute on all <a> tags
  Array.From(document.querySelectorAll('a')).forEach(link => {
      const index = pages.findIndex((element) => element == link.getAttribute('id'));
      const txid = txidArray[index];
      link.setAttribute('href', '#');
      link.setAttribute("onclick", \`navigate(\${txid})\`);
    });
</script>
  </body>
</html>
    `;

  const dataTransaction = await arweave.createTransaction({
    data,
  }, testWeave.rootJWK)

  //testWeave.rootJWK returns test wallet with 10000000 and
  //addres is MlV6DeOtRmakDOf6vgOBlif795tcWimgyPsYYNQ8q1Y

  //add tags -- these are used when querying data
  dataTransaction.addTag('root', 'domain');
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

window.deployContact = async function deployContact() {
  const testWeave = await TestWeave.init(arweave);
  let data = ` 
<html>
  <head>

  </head>

  <body>
<h2>Contact</h2>
<input type="text" id="search" placeholder="enter site name \'blog.ar\'" />
<a id="home" href="#">Home </a>
<a id="about" href="#">Home </a>
<a id="contact" href="#">Home </a>

<ul id="output"></ul>

<footer>
	<p>
		Websites stored on
    <a target="_blank" href="https://arweave.org">Arweave</a>
    last forever. This website can get taken down but they'll still be there
	</p>
</footer>

<!--replace anchor tags in browser -->
<script>
  //arweave function call
function navigate(id){
arweave.transactions.getData(id,{decode: true, string:true}).then(
data => {
document.getElementsByTagName('html')[0].innerHTML = data;
});
};
//get variables (id's), from tag search
let pages = ["aG9tZQ","Y29udGFjdA","YWJvdXQ"]
window.tagQuery = async function tagQuery(page) {
    const root = "domain"
  //graphql query to send to arweave
        const data = JSON.stringify({
         query: \`{
         transactions(
         sort: HEIGHT_DESC,
        tags: {
            name: "cGFnZQ",
           values: "\${page}",
           name: "cm9vdA",
           values: "ZG9tYWlu"
        }
    ) {
        edges {
            node {
                id
            }
        }
    }
  }\`,
        });
  //attempting to fetch transaction is from local 
  //arweave instance using fetch and graphql query
  //- but data id is empty
        const response = await fetch(
          'http://localhost:3000/graphql',
          {
            method: 'post',
            body: data,
            headers: {
              'Content-Type': 'application/json',
              'Content-Length': data.length,
            },
          }
        );
  //stringify response and return most recent txid
        const json = await response.json();
        console.log(JSON.stringify(json.data, null, 2));
        //get transaction id's
        const idArray = json.data.transactions.edges.map(x => x.node.id);
        return idArray[0]
};

let txidArray =  (async() => 
let pages = ["aG9tZQ","Y29udGFjdA","YWJvdXQ"]
     await Promise.all(
        pages.map(async(x, i) => 
            ({ "page": pages[i], "id": await window.tagQuery(x)})
          )
      )
  )();

  //insert onclick attribute on all <a> tags
  Array.From(document.querySelectorAll('a')).forEach(link => {
      const index = pages.findIndex((element) => element == link.getAttribute('id'));
      const txid = txidArray[index];
      link.setAttribute('href', '#');
      link.setAttribute("onclick", \`navigate(\${txid})\`);
    });
</script>
  </body>
</html>
    `;

  const dataTransaction = await arweave.createTransaction({
    data,
  }, testWeave.rootJWK)

  //testWeave.rootJWK returns test wallet with 10000000 and
  //addres is MlV6DeOtRmakDOf6vgOBlif795tcWimgyPsYYNQ8q1Y

  //add tags -- these are used when querying data
  dataTransaction.addTag('root', 'domain');
  dataTransaction.addTag('page', 'contact');
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

