
/* Search function */

async function InitSearch() {
  const index = elasticlunr( function() {
  this.addField('title')
  this.addField('content')
  this.addField('tags')
  this.setRef('uri')
  })

  const response = await fetch("/dummy.json")
  const results = await response.json()
  //console.log(results)

  results.forEach(doc => {
    index.addDoc(doc)
  })

  //const tmp = index.search('Supply')
  //console.log(tmp)

  return index

}

let SearchIndex 
(
  async function() { 
  SearchIndex = await InitSearch()
})()