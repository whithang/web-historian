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
};

exports.isUrlInList = function(url, callback) {
  // if urlIsInWorkerList of achives/sites.txt file
    // callback(true)
  // else
    // callback(false)
};

exports.addUrlToList = function(url, callback) {
  // write this url to urls in progress files at archives/sites.txt
  // expect callback to be an isUrlInList call to check this site was added
};

exports.isUrlArchived = function(url, callback) {
  fs.readdir(paths.archivedSites, (err, files) => {
    if (err) {
      throw err;
    }

    files.forEach(file => {
      file = file.slice(0, file.length - 6); //to remove the .html from file names
      if (file === url) {
        callback(true, url);
      }
    });
  });
  callback(false, url);
};

exports.downloadUrls = function(urls) {
  // tells worker to download pages for these urls
  // [worker should delete urls when done (??)]
};
