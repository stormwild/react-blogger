// Helper functions
function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

module.exports = {
  generateIdFromTitle: function(title) {
    if (!title) { return; }
    return replaceAll(title, ' ', '-').toLowerCase();
  }
};
