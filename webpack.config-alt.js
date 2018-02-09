const path = require('path');
const webpack = require('webpack');

console.log('aa');

module.exports = {
  entry: {
    'themes': path.join(__dirname, 'src', 'themes.js')
  },

  devtool: 'inline-source-map',

  module: {},

  plugins: [
    new webpack.IgnorePlugin(/themes\.js/)
  ],

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  }
};