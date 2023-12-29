const fs = require("fs");
const path = require("path");

var walk = function (dir, done) {
  var results = [];
  fs.readdir(dir, function (err, list) {
    if (err) return done(err);
    var i = 0;
    (function next() {
      var file = list[i++];
      if (!file) return done(null, results);
      file = path.resolve(dir, file);
      fs.stat(file, function (err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function (err, res) {
            results = results.concat(res);
            next();
          });
        } else {
          results.push(file);
          next();
        }
      });
    })();
  });
};
const walkPromised = (dir) => {
  return new Promise((res, rej) => {
    try {
      walk(dir, (err, results) => {
        if (err) return rej(err);
        res(results);
      })
    } catch (error) {
      rej(error);
    }
  })
}

module.exports = walkPromised