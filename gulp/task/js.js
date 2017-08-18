'use strict';
/**
 * Gulp タスク： js
 * Webpack ビルドを実行する
 */
var config   = require('../config.js');
var joinPath = require('../function/joinPath.js');
var gulp     = require('gulp');
var gulpIf   = require('gulp-if');
var plumber  = require('gulp-plumber');
var notify   = require('gulp-notify');
var webpack  = require('webpack-stream');
var rename   = require('gulp-rename');
var debug    = require('gulp-debug');
var hidelog  = require('gulp-strip-debug');


gulp.task('js', function () {
  return gulp.src(joinPath(config.js.path.source, config.js.target), {base: config.js.path.source})
    // エラーポップアップ通知
    .pipe(plumber({
      errorHandler: notify.onError('<%= error.message %>')
    }))
    .pipe(webpack(config.js.webpack))
    .pipe(gulpIf(config.js.buildopt.hidelog,hidelog()))
    .pipe(rename(function (path) {
      var separator = config.js.version.separator;
      var version;
      if (path.extname === '.js') {
        version = config.js.buildopt.addVersion ? (config.js.version.js[path.basename] || config.js.version.js[path.dirname]) : config.js.version.develop;
        path.extname = separator + version + path.extname;
      }
    }))
    .pipe(gulp.dest(config.js.path.build))
    .pipe(debug())
});
