'use strict';
/**
 * Gulp タスク： sprite
 * PNG ファイルから CSS スプライト用の結合画像ファイルと表示サンプル、関連CSSファイルを生成
 */
var config      = require('../config.js');
var joinPath    = require('../function/joinPath.js');
var buffer      = require('vinyl-buffer');
var glob        = require('glob');
var crc         = require('crc');
var fs          = require('fs');
var gulp        = require('gulp');
var gulpIf      = require('gulp-if');
var rename      = require('gulp-rename');
var sprite      = require('gulp.spritesmith');
var imagemin    = require('gulp-imagemin');
var pngquant    = require('imagemin-pngquant');
var consolidate = require('gulp-consolidate');
var debug       = require('gulp-debug');

gulp.task('sprite', function (callback) {
  // Sprite 画像のディレクトリ取得
  var pngFilePath = glob.sync(joinPath(config.sprite.path.source, config.sprite.target));

  // ファイルパスからスプライト用の情報を作成
  var sprites = {};
  for (var i = 0; i < pngFilePath.length; i++) {
    if (pngFilePath[i].match(/^(.+\/)_(.+?)\/(.*)$/)) {
      var fileName = RegExp.$1 + RegExp.$2;
      var spriteName = RegExp.$2;
      if (fileName in sprites) {
        sprites[fileName].items.push(pngFilePath[i]);
      } else {
        sprites[fileName] = {name: spriteName, items: [pngFilePath[i]]};
      }
    }
  }

  // タスクの終了を通知
  var task_num = Object.keys(sprites).length + 1;
  var task_executed = 0;
  var onEnd = function () {
    if (task_num === ++task_executed) {
      callback();
    }
  }

  // Sprite 画像の基本となる CSS Extends を生成
  gulp.src(config.sprite.path.template.cssBase)
    .pipe(consolidate('lodash', {
      className: config.sprite.className
    }))
    .pipe(gulp.dest(config.sprite.path.css))
    .on('end', onEnd);

  // ディレクトリ毎に CSS Extends、画像ファイルを生成
  Object.keys(sprites).forEach(function (outputFilePath) {
    var spriteName = sprites[outputFilePath].name;
    var spriteSourceFiles = sprites[outputFilePath].items;
    var spritePath = outputFilePath.replace(config.sprite.path.source + '/', '').replace(/\/[^\/]+?$/, '');
    var spriteData = gulp.src(spriteSourceFiles, {base: config.sprite.path.source})
      .pipe(sprite({
        imgName: 'sprites-' + spriteName + '.png',
        cssName: spriteName + '.css',
        padding: 4,
        cssTemplate: function (data) {
          // CSC Hash 生成用のデータを生成
          var spriteSourceFilessData = spriteSourceFiles.reduce(function (concat, path) {
            return concat + fs.readFileSync(path);
          });
          var opt = {
            spriteName: spriteName,
            spritePath: config.sprite.path.build + '/',
            className: config.sprite.className,
            hash: crc.crc32(spriteSourceFilessData).toString(16),
            data: data
          };
          // CSS Extends 出力
          gulp.src(config.sprite.path.template.cssFile)
            .pipe(consolidate('lodash', opt))
            .pipe(rename({
              prefix: config.sprite.cssPrefix,
              basename: spriteName
            }))
            .pipe(gulp.dest(joinPath(config.sprite.path.css)))
            .on('end', onEnd);
          return '';
        }
      }));

    spriteData.img
      .pipe(buffer())
      .pipe(imagemin([
        pngquant({speed: 1})
      ]))
      .pipe(gulp.dest(config.sprite.path.build))
      .pipe(debug())
      .on('end', onEnd);
  });
});
