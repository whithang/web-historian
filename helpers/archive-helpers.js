var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('request');

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

exports.readListOfUrls = function(callback) {
 
  fs.readFile(exports.paths.list, function(err, html) {
    if (err) {
      throw err;
    }
    html = html.toString().split(',');
    html.pop();
    callback(html);
  }); 
};

exports.isUrlInList = function(url, callback) {
  fs.readFile(exports.paths.list, function(err, data) {
    if (err) {
      throw err;
    }
    var webList = data.toString().split(','); 
    console.log('current webList: ' + webList);
    var isInList = webList.includes(url);
    console.log('isInList? ' + isInList);

    callback && callback(isInList, url); 
    // return isInList;
  });
};

exports.addUrlToList = function(url, callback) {
  fs.appendFile(exports.paths.list, url + ',', (err) => {
    if (err) {
      callback && callback(false);
      throw err;
    }
    callback && callback(true);
    // exports.readListOfUrls(exports.downloadUrls);
  });
  
};

exports.isUrlArchived = function(url, callback, res) {
  fs.readdir(exports.paths.archivedSites, (err, files) => {
    if (err) {
      throw err;
    }
    if (files.includes(url)) {
      fs.readFile(exports.paths.archivedSites + '/' + url, function(err, html) {
        if (err) {
          throw err;
        }
        callback && callback(true, {html: html, statusCode: 200}, res);
        
      });
    } else {
      fs.readFile(exports.paths.siteAssets + '/loading.html', function(err, html) {
        if (err) {
          throw err;
        }
        
        callback && callback(false, {html: html, statusCode: 302}, res);
        // exports.startSideProcesses(url);
        exports.isUrlInList(url, exports.startSideProcesses);
      });
    }
  });
};

exports.downloadUrls = function(urls) {
  if (urls) {
    urls.forEach((url) => {
      url !== 'undefined' && request('http://' + url).pipe(fs.createWriteStream(exports.paths.archivedSites + '/' + url));
    });
    exports.readListOfUrls(function(listOfUrls) {
      listOfUrls = listOfUrls.slice(urls.length).join(',');
      console.log('listOfUrls after slice: ' + listOfUrls);
      if (listOfUrls.length > 0) {
        listOfUrls += ',';
      }
      console.log('listOfUrls after commas append: ' + listOfUrls);
      listOfUrls = listOfUrls || '';
      console.log('listOfUrls after empty assignment: ' + listOfUrls);

      fs.writeFile(exports.paths.list, listOfUrls, (err) => {
        if (err) {
          throw err;
        }
        console.log('The file has been saved!');
      });
    });
  }
};

exports.startSideProcesses = function(boolean, url) {
  if (!boolean) {
    exports.addUrlToList(url);
  }
};





