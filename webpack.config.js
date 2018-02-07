const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: 'src/app.js',

  devtool: 'inline-source-map',

  devServer: {
    contentBase: path.join(__dirname, 'dist')
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            { loader: 'css-loader', options: { importLoaders: 1 } },
            'postcss-loader'
          ]
        })
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin('[name].css'),
    new HtmlWebpackPlugin({
      title: 'TAF Styleguide experiment with Webpack and PostCSS'
    })
  ],

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.[chunkHash].js'
  }
};