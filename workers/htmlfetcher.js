// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var archive = require('../helpers/archive-helpers');

module.exports.cronStart = function() {
  archive.readListOfUrls(archive.downloadUrls);
};


