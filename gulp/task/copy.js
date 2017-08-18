'use strict';
/**
 * Gulp タスク： copy
 * config.dir.static ディレクトリから config.dir.path.build ディレクトリにデータをコピー
 */
var config   = require('../config.js');
var joinPath = require('../function/joinPath.js');
var gulp     = require('gulp');
var gulpIf   = require('gulp-if');
var changed  = require('gulp-changed');
var debug    = require('gulp-debug');

gulp.task('copy', function () {
  return gulp.src(joinPath(config.copy.path.source, '**/*'), {base: config.copy.path.source})
    // Watch 中は タイムスタンプの変化を見てコピー対象を絞る
    .pipe(gulpIf(config.isWatching, changed(config.copy.path.build)))
    .pipe(gulp.dest(config.copy.path.build))
    .pipe(debug());
});
