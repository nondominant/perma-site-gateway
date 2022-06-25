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
              newScript.innerHTML = scripts[i].innerHTML;
              document.body.appendChild(newScript)
              //then remove the node it is replacing
              document.getElementById(i).remove();
            }
          }
      });
}

