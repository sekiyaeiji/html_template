var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractTextPlugin = new ExtractTextPlugin('[name].css');

module.exports = [{
  context: path.join(__dirname, 'src/scss'),
  entry: {
    style: './common/import.scss'
  },
  output: {
    path: path.join(__dirname, 'dist/css'),
    filename: '[name].css'
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?-url&minimize&sourceMap!sass-loader')
      }
    ]
  },
  devtool: 'source-map',
  plugins: [
    extractTextPlugin
  ]
}];