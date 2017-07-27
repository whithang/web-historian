var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers.js');
var fs = require('fs');
// require more modules/folders here!

var endRequest = function(complete, html, res) {
  if (complete === true) {
    //success, return 200
    statusCode = 200;
    res.writeHead(statusCode, httpHelpers.headers);
    res.write(html);
    res.end();
  // } else if (complete === 'notFound') {
  //   //returned loading.html, return 302
  //   statusCode = 302;
  //   res.writeHead(statusCode, httpHelpers.headers);
  //   res.write(html);
  //   res.end();
  } else {
    //failed, return 400
    statusCode = 400;
    res.writeHead(statusCode, httpHelpers.headers);
    res.write(html);
    res.end();
  }
};

var listCheckResponder = function(inList, url) {
  if (!inList) {
    archive.addUrlToList(url, archive.isUrlInList);
  } 
};

var initialRequestResponder = function(hasCopy, url) {
  if (hasCopy) {
    window.location.replace(archive.paths.archivedSites + url + '.html');
  } else {
    window.location.replace(archive.paths.siteAssets + '/loading.html');
    archive.isUrlInList(url, listCheckResponder);
  }
};

exports.handleRequest = function (req, res) {
  if (req.method === 'POST') {
    // run this function on submit
    archive.isUrlArchived(req.url, endRequest, res);
  } else {
    fs.readFile(archive.paths.siteAssets + '/index.html', function(err, html) {
      if (err) {
        //endRequest(false, html);
        throw err;
      }
      endRequest(true, html, res);
      // statusCode = 200;
      // res.writeHead(statusCode, httpHelpers.headers);
      // res.write(html);
      // res.end();
    });
  }
  
};
