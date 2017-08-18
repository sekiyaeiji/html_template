'use strict';
/**
 * Gulp タスク： clean
 * config.dir.build, config.dir.temp, config.dir.sample ディレクトリを削除
 */
var config   = require('../config.js');
var gulp     = require('gulp');
var del      = require('del');
var joinPath = require('../function/joinPath.js');

// 削除対象を定義
var deleteTarget = [
  config.dir.build,
  config.font.path.css + '/' + config.font.cssPrefix + '*.css',
  config.sprite.path.css + '/' + config.sprite.cssPrefix + '*.css',
  config.dir.temporary,
];

gulp.task('clean', function (callback) {
  del(deleteTarget)
    .then(function (paths) {
      console.log('Deleted files and Directories:\n', '\u001b[34m' + paths.join('\n') + '\u001b[0m');
      callback();
    });
});
