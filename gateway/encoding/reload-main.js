const {default: Arweave} = require('arweave');
const {default: TestWeave} = require('testweave-sdk');
const fs = require('browserify-fs');
const txid ="C8oF-8EHYVzVh_3bxAGngyX7-OwGAg8cjK9CwkPuE38"
const arweave = Arweave.init({
  host: 'localhost',
  port: 1984,
  protocol: 'http',
  timeout: 20000,
  logging: false,
});


window.load = async function load() {
  console.log("loading");
  await arweave.transactions.getData(txid, {decode: true, string: true})
    .then(data => {
            document.createElement('script');
            document.getElementsByTagName('body')[0].innerHTML = data;
      })
    .then(() => {
          let scripts = document.getElementsByTagName('script');
          for (let i = 0; i < scripts.length; i++) {
            console.log(scripts[i].innerHTML);
            scripts[i].setAttribute("id", i);
            if (i == 1) {
              //grab the node we want to load properly
              let newScript = document.createElement('script');
              newScript.setAttribute("id", "test");
              newScript.setAttribute("defer", '');
              newScript.innerHTML = scripts[i].innerHTML;
              document.head.appendChild(newScript)
              //then remove the node it is replacing
              document.getElementById(i).remove();
            }
          }
      });
      
      window.document.dispatchEvent(new Event("DOMContentLoaded", {
        bubbles: true,
        cancelable: true
      }));
      
}

window.deployHome = async function deployHome() {
  const testWeave = await TestWeave.init(arweave);
  let data = ` 
<html>
  <head>

  </head>

  <body>
<h2>Web 2 gateway to decentralized sites PAGE 1</h2>
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
window.navigate = function navigate(id){
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
console.log("running purple")
let pages = ["aG9tZQ","Y29udGFjdA","YWJvdXQ"]
     let obj = await Promise.all(
        pages.map(async(x, i) => 
            ({ "page": pages[i], "id": await window.tagQuery(x)})
          )
      )
      return obj;
  )();

  //insert onclick attribute on all <a> tags
  Array.from(document.querySelectorAll('a')).forEach(link => {
      const index = pages.findIndex((element) => element == link.getAttribute('id'));
      const txid = txidArray[index];
      link.setAttribute('href', '#');
      link.setAttribute('class', 'successful_3');
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
