'use strict';
/**
 * Gulp タスク： img
 * 画像を非劣化で圧縮する
 */
var config   = require('../config.js');
var joinPath = require('../function/joinPath.js');
var gulp     = require('gulp');
var plumber  = require('gulp-plumber');
var notify   = require('gulp-notify');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var debug    = require('gulp-debug');

// 処理対象を定義
var imgTarget = [
  joinPath(config.img.path.source, config.img.target),
  '!' + joinPath(config.sprite.path.source, config.sprite.target)
];

gulp.task('img', function () {
  return gulp.src(imgTarget, {base: config.img.path.source})
    // エラーポップアップ通知
    .pipe(plumber({
      errorHandler: notify.onError('<%= error.message %>')
    }))
    .pipe(imagemin([
      imagemin.gifsicle(),
      imagemin.jpegtran(),
      pngquant({speed: 1}),
      imagemin.svgo({
        plugins: [
          {removeRasterImages: true},
          {cleanupListOfValues: true},
          {sortAttrs: true},
          {removeUselessStrokeAndFill: true},
          {convertPathData: false},
          {removeTitle: true},
          {removeDesc: true}
        ]
      })
    ]))
    .pipe(gulp.dest(config.img.path.build))
    .pipe(debug());
});
