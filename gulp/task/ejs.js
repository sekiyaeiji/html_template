'use strict';
/**
 * Gulp タスク： ejs
 * Ejs ファイルをコンパイルして出力
 */
var config   = require('../config.js');
var merge    = require('../function/mergeObjects.js');
var joinPath = require('../function/joinPath.js');
var gulp     = require('gulp');
var plumber  = require('gulp-plumber');
var notify   = require('gulp-notify');
var ejs      = require('gulp-ejs');
var debug    = require('gulp-debug');

// 処理対象を定義
var ejsTarget = [
  joinPath(config.ejs.path.source, config.ejs.target),
  '!' + joinPath(config.ejs.path.source, config.ejs.exclude)
];

gulp.task('ejs', function () {
  return gulp.src(ejsTarget)
    // エラーポップアップ通知
    .pipe(plumber({
      errorHandler: notify.onError('<%= error.message %>')
    }))
    .pipe(ejs({
      version:config.ejs.version
    }, {ext: '.html'}))
    .pipe(gulp.dest(config.ejs.path.build))
    .pipe(debug());
});
