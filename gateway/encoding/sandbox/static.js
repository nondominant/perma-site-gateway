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
//arweave function call
//---------------------
window.navigate = function navigate(id){
  arweave.transactions.getData(id,{decode: true, string:true})
    .then(
      data => {
      document.getElementsByTagName('html')[0].innerHTML = data;
    });
};
//---------------------

//---------------------
window.tagQuery = async function tagQuery(page) {
    //graphql query to send to arweave
        const data = JSON.stringify({
         query: `{
         transactions(
         sort: HEIGHT_DESC,
        tags: {
            name: "cGFnZQ",
           values: "\${page}",
        }
    ) {
        edges {
            node {
                id
            }
        }
    }
  },
        }`});
  //attempting to fetch transaction is from local 
  //arweave instance using fetch and graphql query
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
  //get transaction id's
  const idArray = json.data.transactions.edges.map(x => x.node.id);
  //return most recent transaction id
  return idArray[0]
};
//---------------------

window.getID = async function getID() {
let pages = ["aG9tZQ","Y29udGFjdA","YWJvdXQ"]
     let obj = await Promise.all(
        pages.map(async(x, i) => 
            ({ "page": pages[i], "id": await window.tagQuery(x)})
          )
      )
      return obj;
};

window.replaceTags = async function replaceTags() {
  txidArray = await window.getID();
  let pages = ["aG9tZQ","Y29udGFjdA","YWJvdXQ"]
  //insert onclick attribute on all <a> tags
  //###############TODO
  Array.from(document.querySelectorAll('a')).forEach(link => {
      const index = pages.findIndex((element) => element == link.getAttribute('page'));
      const txid = txidArray[index];
      link.setAttribute('href', '#');
      link.setAttribute('class', 'successful_3');
      link.setAttribute("onclick", `navigate(${txid})`);
    });
  //###############
};

window.replaceTags();
