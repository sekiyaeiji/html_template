/* ========== Require ========== */
// パス結合
var joinPath = require(__dirname + '/function/joinPath.js');
var path = require('path');

// タスクの引数を取得（環境情報/バージョン付与/開発）
var options = require('minimist')(process.argv.slice(2), {
  string: ['env'],
  boolean: [
    'addVersion',
    'debug'
  ],
  default: {
    env: 'local',
    addVersion: false,
    debug: false
  }
});

// バージョン付与
var version = require(__dirname + '/version.json');

/* ========== Setting ========== */
// プロジェクトディレクトリ情報
var dir = {};
dir.static    = 'static';     // 静的データ用（公開ディレクトリへコピー）
dir.source    = 'src';        // 開発データ用（Sassや圧縮前の画像やJSファイルなど）
dir.build     = 'dist';       // 公開データ用（生成ファイル群。このディレクトリのファイルを直接触らない）
dir.temporary = 'tmp';        // 中間生成物一時保管用
dir.template  = joinPath(dir.source, 'template'); // 開発データ用テンプレート

/* ========== Tasks ========== */
// 標準実行タスクの指定
var tasks = {
  html:   'ejs',
  css:    'css',
  font:   'font',
  image:  'img',
  sprite: 'sprite',
  js:     'js'
};

// copy タスク用設定情報
var copy = {};
copy.path = {
  source: dir.static,
  build: joinPath(dir.build)
};

// ejs タスク用設定情報
var ejs = {
  target:  '**/*.ejs',
  exclude: 'include/**/*.ejs',
  srcDir:  'ejs',
  genDir:  'html',
  version: version
};
ejs.path = {
  source: joinPath(dir.source, ejs.srcDir),
  build:  joinPath(dir.build, ejs.genDir)
};

// css タスク用設定情報
var css = {
  target: '**/*.css',
  genFile: ['contents.css', 'frame.css'],
  version: version,
  srcDir: 'css',
  genDir: 'css',
  autoprefixer: {
    browsers: [
      'ie 9',
      'ie 11',
      'last 1 Edge versions',
      'last 1 Firefox versions',
      'last 1 Chrome versions',
      'last 1 Safari versions',
      'iOS >= 7',
      'Android >= 4.1',
      'last 1 ChromeAndroid versions'
    ]
  }
};
css.path = {
  source: joinPath(dir.source, css.srcDir),
  build:  joinPath(dir.build, css.genDir)
};
css.buildopt = {
  minify: !options.debug,
  addVersion: options.addVersion
};

// font タスク用設定情報
var font = {
  target:    '**/*.svg',
  srcDir:    'font',
  genDir:    'font',
  cssPrefix: 'iconfont-',
  className: 'c-wficon'
};
font.path = {
  source: joinPath(dir.source, font.srcDir),
  build:  joinPath(dir.build, font.genDir),
  css:    joinPath(eval(tasks.css + '.path.source'), 'object/component'),
  template: {
    cssBase: joinPath(dir.template, 'iconfont-base.css'),
    cssFont: joinPath(dir.template, 'iconfont-family.css')
  }
};

// img タスク用設定情報
var img = {
  target: '**/*.+(jpg|jpeg|png|gif|svg)',
  srcDir: 'img',
  genDir: 'img'
};
img.path = {
  source: joinPath(dir.source, img.srcDir),
  build:  joinPath(dir.build, img.genDir)
};

// sprite タスク用設定情報
var sprite = {
  target:    '**/*.png',
  srcDir:    'img/sprite',
  cssPrefix: 'sprite-',
  className: 'c-sprite'
};
sprite.path = {
  source: joinPath(dir.source, sprite.srcDir),
  build:  eval(tasks.image + '.path.build'),
  css:    joinPath(eval(tasks.css + '.path.source'), 'object/component'),
  template: {
    cssBase: joinPath(dir.template, 'sprite-base.css'),
    cssFile: joinPath(dir.template, 'sprite-file.css'),
  }
};

// js タスク用設定情報
var webpack = require('webpack');
var js = {
  target: '**/*.*',
  version: version,
  srcDir: 'js',
  genDir: 'js'
};
js.path = {
  source: joinPath(dir.source, js.srcDir),
  build:  joinPath(dir.build, js.genDir)
};
js.buildopt = {
  hidelog: !options.debug,
  addVersion: options.addVersion
};
js.webpack = {
  entry: {
    'lib': [
      'vue',
      'vuex',
      'jquery',
      './src/js/common/bin/dummyConsole.js',
      './src/js/common/bin/shopIdModifiedCheck.js'
    ],
    'pages/top': './' + joinPath(js.path.source, 'pages/top/main.js'),
    'pages/edit': './' + joinPath(js.path.source, 'pages/edit/main.js'),
    'pages/sort': './' + joinPath(js.path.source, 'pages/sort/main.js'),
    'pages/delete': './' + joinPath(js.path.source, 'pages/delete/main.js'),
    'pages/copy': './' + joinPath(js.path.source, 'pages/copy/main.js'),
    'pages/price': './' + joinPath(js.path.source, 'pages/price/main.js'),
    'pages/error': './' + joinPath(js.path.source, 'pages/error/main.js'),
    'pages/course': './' + joinPath(js.path.source, 'pages/course/main.js')
  },
  output: {
    filename: '[name].js'
  },
  module: {
    loaders: [{
      test: /\.vue$/,
      loader: 'vue'
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel'
    }]
  },
  resolve: {
    extentions: ['', '.js', '.vue'],
    root: [
      path.resolve('./', 'src/js')
    ],
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      'img': path.resolve('./', 'dist/img')
    }
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'lib',
      chunks: [
        'pages/top',
        'pages/edit',
        'pages/sort',
        'pages/delete',
        'pages/copy',
        'pages/price',
        'pages/error',
        'pages/course'
      ],
      minChunks: Infinity
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    new webpack.DefinePlugin({
      IS_ENV_PROD: options.env === 'prod',
      IS_ENV_STAGE: options.env === 'stage',
      IS_DEBUG: options.debug
    })
  ],
  cache: true
};

if (options.debug) {
  js.webpack.devtool = 'source-map';
} else {
  js.webpack.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
    },
  }));
}

// 登録
module.exports = {
  isWatching: false,
  env:        options.env,
  addVersion: options.addVersion,
  debug:      options.debug,
  dir:        dir,
  tasks:      tasks,
  copy:       copy,
  ejs:        ejs,
  css:        css,
  font:       font,
  img:        img,
  sprite:     sprite,
  js:         js
};
