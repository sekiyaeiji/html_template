'use strict';
/**
 * Gulp タスク： font
 * SVG ファイルから Web フォントと表示サンプル、関連CSSファイルを生成
 */
var config      = require('../config.js');
var joinPath    = require('../function/joinPath.js');
var glob        = require('glob');
var crc         = require('crc');
var fs          = require('fs');
var gulp        = require('gulp');
var gulpIf      = require('gulp-if');
var rename      = require('gulp-rename');
var iconfont    = require('gulp-iconfont');
var imagemin    = require('gulp-imagemin');
var consolidate = require('gulp-consolidate');
var debug       = require('gulp-debug');

gulp.task('font', function (callback) {
  // Web フォントのディレクトリ取得
  var fontFilePath = glob.sync(joinPath(config.font.path.source, config.font.target));

  // ファイルパスからWebフォント用の情報を作成
  var fonts = {};
  for (var i = 0; i < fontFilePath.length; i++) {
    if (fontFilePath[i].match(/^(.+\/)_(.+?)\/(.*)$/)) {
      var fileName = RegExp.$1 + RegExp.$2;
      var fontName = RegExp.$2;
      if (fileName in fonts) {
        fonts[fileName].items.push(fontFilePath[i]);
      } else {
        fonts[fileName] = {name: fontName, items: [fontFilePath[i]]};
      }
    }
  }

  // タスクの終了を通知
  var task_num = Object.keys(fonts).length + 1;
  var task_executed = 0;
  var onEnd = function () {
    if (task_num === ++task_executed) {
      callback();
    }
  };

  // Web フォントの基本となる CSS Extends を生成
  gulp.src(config.font.path.template.cssBase)
    .pipe(consolidate('lodash', {
      className: config.font.className
    }))
    .pipe(gulp.dest(config.font.path.css))
    .on('end', onEnd);

  // ディレクトリ毎に CSS Extends、Web フォントファイルを生成
  Object.keys(fonts).forEach(function (outputFilePath) {
    var fontName = fonts[outputFilePath].name;
    var fontSourceFiles = fonts[outputFilePath].items;
    var fontPath = outputFilePath.replace(config.font.path.source + '/', '').replace(/\/[^\/]+?$/, '');
    gulp.src(fontSourceFiles, {base: config.font.path.source})
      .pipe(imagemin([
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
      .pipe(iconfont({
        fontName: fontName,
        prependUnicode: true,
        startUnicode: 0xF000,
        formats: ['ttf', 'eot', 'woff', 'svg', 'woff2'],
        normalize: true,
        fontHeight: 500
      }))
      .on('glyphs', function (glyphs, options) {
        // CSC Hash 生成用のデータを生成
        var fontSourceFilesData = fontSourceFiles.reduce(function (concat, path) {
          return concat + fs.readFileSync(path);
        });
        var opt = {
          glyphs: glyphs.map(function (glyph) {
            return {
              name: glyph.name,
              codepoint: glyph.unicode[0].charCodeAt(0)
            };
          }),
          fontName: fontName,
          fontPath: config.font.path.build + '/',
          className: config.font.className,
          hash: crc.crc32(fontSourceFilesData).toString(16)
        };
        // CSS Extends 出力
        gulp.src(config.font.path.template.cssFont)
          .pipe(consolidate('lodash', opt))
          .pipe(rename({
            prefix: config.font.cssPrefix,
            basename: fontName
          }))
          .pipe(gulp.dest(config.font.path.css))
          .on('end', onEnd);
      })
      .pipe(gulp.dest(config.font.path.build))
      .pipe(debug())
      .on('end', onEnd);
  }, fonts);
});
