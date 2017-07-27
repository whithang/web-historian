var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers.js');
var fs = require('fs');
// require more modules/folders here!

var initialRequestResponder = function(hasCopy, url) {
  // if hasCopy,
    // serve it up (move to other page for decisioning)
    //server response with 300 status code
    //OR window.location.replace(new url)
  // else
    // serve up loading page (move to other page for decisioning)
    //server response with 300 status code
    // isUrlInList(url, )

};

exports.handleRequest = function (req, res) {
  fs.readFile('./web/public/index.html', function(err, html) {
    if (err) {
      throw err;
    }
    statusCode = 200;
    res.writeHead(statusCode, httpHelpers.headers);
    res.write(html);
    res.end();
  });

  // run this function on submit
  // archive.isUrlArchived(req.url, initialRequestResponder);
};
