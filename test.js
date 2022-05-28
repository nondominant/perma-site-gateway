search --> trigger function with search term argument

("string") => {
  const data = getData("string");


  document.getElementByTagName("html")[0].innerHTML = data;
}

getData("string") => {
  const id = graphql request for tag "string"
  const data = arweave.transactions.getData(id).then((response) => {
    return response.data;
  }
  return data;
}
