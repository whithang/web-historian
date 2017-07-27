var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  //get list from the achives/sites.txt file
  //callback(list of urls)
  fs.readFile(exports.paths.list, function(err, html) {
    if (err) {
      throw err;
    }
    html = html.toString().split(',');
    callback(html);
  }); 
};

exports.isUrlInList = function(url, callback) {
  //readListOfUrls(callback);
  fs.readFile(exports.paths.list, function(err, data) {
    if (err) {
      throw err;
    }
    var webList = data.toString().split(','); //is data already a string?
    var isInList = webList.includes(url);
    // console.log('webList: ' + webList);
    // console.log('url: ' + url + ' , isInList: ' + isInList);
    callback && callback(isInList); //test parameters vs addUrlToList parameters
    return isInList;
  });
};

exports.addUrlToList = function(url, callback) {
  // write this url to urls in progress files at archives/sites.txt
  fs.appendFile(exports.paths.list, url + ',', (err) => {
    if (err) {
      callback && callback(false);
      throw err;
    }
  });
  // expect callback to be an isUrlInList call to check this site was added
  callback && callback(true);
};

exports.isUrlArchived = function(url, callback) {
  // var reqObj = {};
  fs.readdir(exports.paths.archivedSites, (err, files) => {
    if (err) {
      throw err;
    }
    if (files.includes(url)) {
      //redirect to html page
      fs.readFile(exports.paths.list, function(err, html) {
        if (err) {
          throw err;
        }
        // console.log('isURLArchived html: ' + html);
        // reqObj['html'] = html;
        // reqObj['statusCode'] = 200;
        callback && callback(true, {html: html, statusCode: 200});

        // return {html: html, statusCode: 200};
      });
    } else {
      //redirect to loading page
      fs.readFile(exports.paths.siteAssets + '/loading.html', function(err, html) {
        if (err) {
          throw err;
        }
        
        callback && callback(false, {html: html, statusCode: 302});
        exports.startSideProcesses(url);
        // console.log('isURLArchived html: ' + html);
        // var reqObj = {};
        // reqObj['html'] = html;
        // reqObj['statusCode'] = 302;
        // return {html: html, statusCode: 302};
      });
      //start other side processes
    }
  });
  // return reqObj;
};

exports.downloadUrls = function(urls) {
  // tells worker to download pages for these urls
  // [worker should delete urls when done (??)]
};

exports.startSideProcesses = function(url) {
  if (!exports.isUrlInList(url)) {
    exports.addUrlToList(url);
  }
};





