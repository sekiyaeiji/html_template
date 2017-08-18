'use strict';
/**
 * Gulp タスク： css
 * PostCSS ファイルをコンパイルして出力
 */
var config   = require('../config.js');
var joinPath = require('../function/joinPath.js');
var gulp     = require('gulp');
var gulpIf   = require('gulp-if');
var cached   = require('gulp-cached');
var plumber  = require('gulp-plumber');
var notify   = require('gulp-notify');
var filter   = require('gulp-filter');
var postcss  = require('gulp-postcss');
var rename   = require('gulp-rename');
var debug    = require('gulp-debug');

gulp.task('css', function () {
  // loadPaths 設定
  var loadPaths = [
    config.font.path.build,
    config.img.path.build
  ];

  // PostCSS Processor 設定
  var genFile = config.css.genFile.map(function (file) {
    return joinPath(config.css.path.source, file);
  });
  var processors = [
    require('postcss-easy-import')({glob: true}),
    require('precss')({extension: 'css'}),
    require('postcss-assets')({
      loadPaths: loadPaths,
      relative:  config.css.path.build
    }),
    //require('postcss-extend')(),
    require('css-mqpacker')(),
    require('autoprefixer')(config.css.autoprefixer)
  ];
  if (config.css.buildopt.minify) {
    processors.push(require('cssnano')({
      minifyFontValues: {
        removeQuotes: false
      },
      zindex: false
    }));
  }

  return gulp.src(joinPath(config.css.path.source, config.css.target), {base: config.css.path.source})
    // エラーポップアップ通知
    .pipe(plumber({
      errorHandler: notify.onError('<%= error.message %>')
    }))
    .pipe(postcss(processors))
    .pipe(filter(genFile))
    .pipe(rename(function(path){
      var separator = config.css.version.separator;
      var version = config.css.buildopt.addVersion ? config.css.version.css[path.basename] : config.css.version.develop;
      path.extname = separator + version + ".css"
    }))
    .pipe(gulp.dest(config.css.path.build))
    .pipe(debug());
});
