'use strict';
/**
 * 指定ディレクトリ直下の子ディレクトリを配列で取得
 * @return {Array} 配列名
 */
var fs   = require('fs');
var path = require('path');

module.exports = function (directory) {
  return fs.readdirSync(path.join(__dirname, '../../') + directory)
    .filter(function (file) {
      return fs.statSync(path.join(directory, file)).isDirectory();
    });
};
