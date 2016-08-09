module.exports = {
  generateIdFromTitle: function(title) {
    /* Exceptions:
    + (example.com/2+2=4 vs 2-2=4)
    = (example.com/2+2=4 vs 2+2-4)
    */
    var punctuationRegex = /[\'\".,\/#!$%\^&\*;:{}\-_`~()\[\]]/;
    if (!title) { return; }
      return title.replace(new RegExp(punctuationRegex, 'g'), '').replace(new RegExp(' ', 'g'), '-').toLowerCase();
  }
};
