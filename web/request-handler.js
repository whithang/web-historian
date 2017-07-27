var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers.js');
var fs = require('fs');
// require more modules/folders here!

var endRequest = function(reqObj, res) { //complete, html, res) {
  // if (complete === 'complete') {
    //success, return 200
    //statusCode = 200;
  res.writeHead(reqObj.statusCode, httpHelpers.headers);
  res.write(reqObj.html);
  res.end();
  // } else if (complete === 'notFound') {
  //   //returned loading.html, return 302
  //   statusCode = 302;
  //   res.writeHead(statusCode, httpHelpers.headers);
  //   res.write(html);
  //   res.end();
  // } else {
  //   //failed, return 400
  //   statusCode = 400;
  //   res.writeHead(statusCode, httpHelpers.headers);
  //   res.write(html);
  //   res.end();
  // }
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

// exports.requestComplete = function(boolean, functionName, html) {
//   if (functionName === 'isUrlArchived') {
//     if (boolean) {
//       //status code = 200
//     } else {
//       //status code = 302
//     }
//   } else if (functionName === '') {
//     if (boolean) {
  
//     } else {
    
//     }
//   }
//   return {html: , statusCode: };
// };

exports.getObj = function(boolean, obj) { 
  console.log('reqObj from handleRequest ');
  console.log(reqObj);
  console.log(JSON.stringify(reqObj));
  return obj;
};

exports.handleRequest = function (req, res) {
  if (req.method === 'POST') {
    // run this function on submit
    archive.isUrlArchived(req.url, getObj); //prev version had endRequest as callback
    // var reqObj = {'html': getObj.obj;
    // now need to gather status code, and html
    //** NEED TO FIGURE OUT HOW TO GET OUR OBJECT AFTER THE CALLBACK*** 
    endRequest(reqObj, res);
  } else {
    fs.readFile(archive.paths.siteAssets + '/index.html', function(err, html) {
      if (err) {
        //endRequest(false, html);
        throw err;
      }
      endRequest({statusCode: 200, html: html}, res);
      // statusCode = 200;
      // res.writeHead(statusCode, httpHelpers.headers);
      // res.write(html);
      // res.end();
    });
  }
  
};
