
/* Search function */

function Search() {
  var search = elasticlunr( function() ) {
  this.addField('title');
  this.addField('content');
  this.addField('tags');
  this.setRef('ref');
  });

}


