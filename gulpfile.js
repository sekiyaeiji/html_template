/**
 * html_template
 *
 * ** 開発開始手順
 *
 * $ npm i
 * $ gulp sprite
 * $ gulp iamgemin
 *
 *
 * ** 開発開始 with watchコマンド
 *
 * $ gulp start
 *
 * ** buildコマンド
 *
 * $ gulp
 *
 * ** spriteコマンド
 *
 * $ gulp sprite
 *
 * ** iamgeminコマンド
 *
 * $ gulp iamgemin
 *
 * ** js testコマンド
 *
 * $ gulp test
 *
 * ** dist、tmp削除コマンド
 *
 * $ gulp clean
 *
 * ---------------------------------------------------------------------- */

/*
 * init package
 */
const gulp = require('gulp')
const runSequence = require('run-sequence')
const plumber = require('gulp-plumber')
const notify = require('gulp-notify')
const browserSync = require('browser-sync')
const rename = require('gulp-rename')
const size = require('gulp-size')
const postcss = require('gulp-postcss')
const moment = require('momentjs')
const timestump = moment().format('YYYYMMDDhhmmss')
//const timestump = '20161012113446'
const version = require('./gulp/version.json')
const path = require('./gulp/path.json')


/*
 * task manage
 */
// build:css
gulp.task('build:css', function () {
  runSequence('precss', 'renamecss', 'postcss')
})

// build:js
gulp.task('build:js', function () {
  runSequence('babel', 'test')
})

// build:html
gulp.task('build:html', function () {
  runSequence('ejs')
})

// build:copy
gulp.task('build:copy', function () {
  runSequence('copy')
})

// imagemin
gulp.task('imagemin', function () {
  runSequence('imageMin')
})

// test
gulp.task('test', function () {
  runSequence('eslint')
})

// build
gulp.task('build', function () {
  return runSequence(
    'build:css', 'build:js', 'build:html', 'build:copy'
  )
})

// default
gulp.task('default', function () {
  runSequence('build')
})


/*
 * option task
 */
// start
gulp.task('start', function () {
  return runSequence(
    'build', 'watch', 'serve'
  )
})

// local
gulp.task('local', function () {
  runSequence('build')
})

// dev
gulp.task('dev', function () {
  runSequence('build')
})


/*
 * js parts
 */
const js_part = {
  common: [
    path.dir.js_src + 'common/utility.js',
    path.dir.js_src + 'common/ajax.js',
    path.dir.js_src + 'common/ui.js'
  ]
}


/*
 * BrowserSync
 */
gulp.task('serve', function () {
  const syncOption = {
    port: 8051,
    ui: {
      port: 8052
    },
    server: {
      baseDir: path.dir.dist
    }
  }
  browserSync(syncOption)
})


/*
 * watch
 */
gulp.task('watch', function () {
  console.log('---------- watch ----------')
  return (function(){
    gulp.watch(path.dir.css_src + '**/*.css', ['build:css']).on('change', browserSync.reload)
    gulp.watch(path.dir.js_src + '**/*.js', ['build:js']).on('change', browserSync.reload)
    gulp.watch(path.dir.html_src + '**/*.{ejs,json}', ['build:html']).on('change', browserSync.reload)
    gulp.watch(path.dir.img_src + '**/*.{png,jpg}', ['build:copy']).on('change', browserSync.reload)
    gulp.watch('gulpfile.js', ['build']).on('change', browserSync.reload)
  })()
})


/*
 * clean
 */
const clean = require('del')
gulp.task('clean', function () {
  console.log('---------- clean ----------')
  clean(path.dir.tmp)
  clean(path.dir.dist)
  clean(path.dir.tmp_dev)
})


/*
 * sprite
 */
const spritesmith = require('gulp.spritesmith')
gulp.task('sprite', function () {
  console.log('---------- sprite ----------')
  const spriteData = gulp.src(path.dir.sprite_src + 'sprite-icon/*.png')
  .pipe(spritesmith({
    imgName: 'sprite-icon.png',
    cssName: 'sprite-icon.css',
    imgPath: '../img/sprite-icon.png',
    cssFormat: 'css',
    padding: 5,
    cssOpts: {
    cssSelector: function (sprite) {
      return '.icon--' + sprite.name;
    }
  }
  }))
  spriteData.img.pipe(gulp.dest(path.dir.img_src))
  spriteData.css.pipe(gulp.dest(path.dir.css_src + 'common/module/'))
    .pipe(size({title:'size : sprite'}))
})


/*
 * imageMin
 */
const imagemin = require('gulp-imagemin')
gulp.task('imageMin', function() {
  console.log('---------- imageMin ----------')
  return gulp.src(path.dir.img_src + '**/*')
    .pipe(imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest(path.dir.img_src))
})


/*
 * postcss
 */
// precss(scss like)
const precss = require('precss')
gulp.task('precss', function () {
  console.log('---------- css ----------')
  return gulp.src(path.dir.css_src + '**/*.css')
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(postcss([
        precss()
    ]))
    .pipe(gulp.dest(path.dir.tmp + 'css/'))
})

// rename
gulp.task('renamecss', function () {
  return gulp.src(path.dir.tmp + 'css/common/import.css')
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(rename('common-' + version.css.common + '.css'))
    .pipe(gulp.dest(path.dir.tmp + 'css/'))
})

// postcss
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
gulp.task('postcss', function () {
  return gulp.src(path.dir.tmp + 'css/*.css')
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(postcss([
      autoprefixer ({
        browsers: ['last 2 version', 'ie >= 9'],
        cascade: false
       }),
      cssnano({
        minifyFontValues: {
          removeQuotes: false
        }
      })
    ]))
    .pipe(gulp.dest(path.dir.dist + 'css/'))
    .pipe(size({title:'size : css'}))
})


/*
 * kss styleguide
 */
const kss = require('gulp-kss')
gulp.task('styleguide', function () {
  return gulp.src(path.dir.tmp + 'css/common.css')
    .pipe(kss({
      overview: path.dir.styleguide_src + 'styleguide.md'
    }))
    .pipe(gulp.dest(path.dir.dist + 'styleguide/'))
})


/*
 * js
 */
// es2015
const babel = require('gulp-babel')
const concat = require('gulp-concat-util')
const minify = require('gulp-babel-minify')
const uglify = require('gulp-uglify')

// babel
gulp.task('babel', function () {
  console.log('---------- js ----------')
  return gulp.src(js_part.common)
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(concat('common-' + version.js.common + '.js'))
    .pipe(concat.header([
      '(function(window, $){',
      "  'use strict';",
      ''
    ].join('\n')))
    .pipe(concat.footer([
      '',
      '})(window, window.jQuery)'
    ].join('\n')))
    .pipe(gulp.dest(path.dir.tmp + 'js/'))
    .pipe(babel({
      filename: 'common-' + version.js.common + '.js',
      presets: [["es2015", {"loose": true}]],
      compact: true,
      minified: true,
      comments: false
    }))
    .pipe(uglify())
    .pipe(gulp.dest(path.dir.dist + 'js/'))
    .pipe(size({title:'size : js common'}))
})


/*
 * js test
 */
// eslint
const eslint = require('gulp-eslint')
gulp.task('eslint', function () {
  return gulp.src(path.dir.tmp + 'js/common.js')
    .pipe(eslint('eslint-config-gnavi'))
})


/*
 * html
 */
// ejs
const ejs = require('gulp-ejs')
const minifyejs = require('gulp-minify-ejs')
gulp.task('ejs', function() {
  console.log('---------- html ----------')
  gulp.src(
      [
        path.dir.html_src + 'html/**/*.ejs',
        '!' + path.dir.html_src + 'html/include/**/*.ejs'
      ]
    )
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(ejs(
      {
        data:{
          default: require('./' + path.dir.html_src + 'data/common/default.json'),
          nav: require('./' + path.dir.html_src + 'data/common/nav.json'),
          sample: require('./' + path.dir.html_src + 'data/module/sample.json'),
          version: require('./gulp/version.json')
        },
        timestump: timestump,
        path: path.stat.local
      },
      {ext: '.html'}
    ))
    .pipe(gulp.dest(path.dir.dist + '/'))
    .pipe(size({title:'size : html'}))
})


/*
 * copy
 */
gulp.task('copy', function () {
  console.log('---------- copy ----------')
  return gulp.src(
    [
      path.dir.img_src + '**/*'
    ],
    {base: path.dir.src}
  )
  .pipe(plumber({
    errorHandler: notify.onError('Error: <%= error.message %>')
  }))
  .pipe(gulp.dest(path.dir.dist))
})


