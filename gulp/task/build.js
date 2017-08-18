'use strict';
/**
 * Gulp タスク： build
 * 関連データをすべてコンパイルしてdistを出力
 */
var config      = require('../config.js');
var gulp        = require('gulp');
var runSequence = require('run-sequence').use(gulp);

gulp.task('build', function(callback){
  runSequence(
    'clean',
    'copy',
    config.tasks.font,
    config.tasks.sprite,
    config.tasks.image,
    config.tasks.html,
    config.tasks.css,
    config.tasks.js,
    callback
  );
});
