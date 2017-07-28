var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers.js');
var fs = require('fs');
// require more modules/folders here!

var endRequest = function(boolean, reqObj, res) { 
  // if (reqObj.statusCode = 200) {
  //   window.location.replace(archive.paths.archivedSites + url + '.html');
  // } else if (reqObj = 302) {
  //   window.location.replace(archive.paths.siteAssets + '/loading.html');
  // }
  res.writeHead(reqObj.statusCode, httpHelpers.headers);
  res.write(reqObj.html);
  res.end();
};

// var listCheckResponder = function(inList, url) {
//   if (!inList) {
//     archive.addUrlToList(url, archive.isUrlInList);
//   } 
// };

// var initialRequestResponder = function(hasCopy, url) {
//   if (hasCopy) {
//     window.location.replace(archive.paths.archivedSites + url + '.html');
//   } else {
//     window.location.replace(archive.paths.siteAssets + '/loading.html');
//     archive.isUrlInList(url, listCheckResponder);
//   }
// };

var objFormatter = function(string) {
  var objStr = '{"';
  for (var i = 0; i < string.length; i++) {
    if (string[i] === '=') {
      objStr += '":"';
    } else if (string[i] === '&') {
      objStr += '","';
    } else {
      objStr += string[i];
    }  
  } 
  objStr += '"}';
  return objStr;
};

exports.handleRequest = function (req, res) {
  
  if (req.method === 'POST') {
    
    var request = '';
    req.on('data', (chunk) => {
      request += chunk;
    });
    req.on('end', () => {
      if (request) {
        // console.log('******* pre objFormatter', request);
        if (request[0] !== '{') {
          request = objFormatter(request);
        }
        // console.log('******** post objFormatter', request);
        request = JSON.parse(request); 
        request.hasOwnProperty('url') && archive.isUrlArchived(request.url, endRequest, res);
      }
    });
  } else {
    fs.readFile(archive.paths.siteAssets + '/index.html', function(err, html) {
      if (err) {
        throw err;
      }
      endRequest(true, {statusCode: 200, html: html}, res);
      
    });
  }
  
};
