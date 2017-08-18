'use strict';
/**
 * Gulp タスク： watch
 * 作業ディレクトリを監視して、変更があればコンパイルタスクを実行
 */
var config      = require('../config.js');
var joinPath    = require('../function/joinPath.js');
var gulp        = require('gulp');
var watch       = require('gulp-watch');
var browserSync = require('browser-sync');

gulp.task('watch', function () {
  config.isWatching = true;
  var timer = {};
  // BrowserSync 起動
  browserSync.init({
    ui:   false,
    open: false,
//    proxy: 'localhost:8436'
    server: {
      baseDir: config.dir.build
    }
  });
  // HTML ファイル監視
  watch(joinPath(config[config.tasks.html].path.source, config[config.tasks.html].target), function () {
    gulp.start(config.tasks.html);
  });
  // CSS ファイル監視
  watch(joinPath(config[config.tasks.css].path.source, config[config.tasks.css].target), function () {
    gulp.start(config.tasks.css);
  });
  // Web フォントファイル監視
  watch(joinPath(config[config.tasks.font].path.source, config[config.tasks.font].target), function () {
    gulp.start(config.tasks.font);
  });
  // sprite ファイル監視
  watch(joinPath(config[config.tasks.sprite].path.source, config[config.tasks.sprite].target), function () {
    gulp.start(config.tasks.sprite);
  });
  // 画像ファイル監視
  watch([
    joinPath(config[config.tasks.image].path.source, config[config.tasks.image].target),
    '!' + joinPath(config[config.tasks.sprite].path.source, config[config.tasks.sprite].target)
  ], function () {
    gulp.start(config.tasks.image);
  });
  // Static ディレクトリ監視
  watch(joinPath(config.dir.static, '**/*'), function () {
    gulp.start('copy');
  });
  // JS ディレクトリ監視
  watch(joinPath(config[config.tasks.js].path.source, config[config.tasks.js].target), function () {
    config.js.webpack.watch = true;
    gulp.start(config.tasks.js);
  });
  // Build ディレクトリ監視、変更があったら Live Reload
  watch(joinPath(config.dir.build, '**/*') , {verbose: true}, function (file) {
    // 大量のファイルが更新された時の Reload 地獄を抑制するためのディレイ処理
    clearTimeout(timer);
    timer = setTimeout(function () {
      browserSync.reload(file.relative);
    }, 800);
  });
});
