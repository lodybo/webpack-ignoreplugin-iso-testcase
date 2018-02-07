const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const baseStyle = new ExtractTextPlugin('styles/base.css');
const brand1Style = new ExtractTextPlugin('styles/brand1.css');
const brand2Style = new ExtractTextPlugin('styles/brand2.css');


module.exports = {
  entry: {
    'app': path.join(__dirname, 'src', 'app.js'),
  },

  devtool: 'inline-source-map',

  devServer: {
    contentBase: path.join(__dirname, 'dist')
  },

  module: {
    rules: [
      {
        test: path.join(__dirname, 'src', 'css', 'base.css'),
        use: baseStyle.extract({
          use: [
            { loader: 'css-loader', options: { importLoaders: 1 } },
            'postcss-loader'
          ]
        })
      },
      {
        test: path.join(__dirname, 'src', 'css', 'brand-1.css'),
        use: brand1Style.extract({
          use: [
            { loader: 'css-loader', options: { importLoaders: 1 } },
            'postcss-loader'
          ]
        })
      },
      {
        test: path.join(__dirname, 'src', 'css', 'brand-2.css'),
        use: brand2Style.extract({
          use: [
            { loader: 'css-loader', options: { importLoaders: 1 } },
            'postcss-loader'
          ]
        })
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin('dist'),
    // new ExtractTextPlugin('css/[name].css'),
    baseStyle,
    brand1Style,
    brand2Style,
    new HtmlWebpackPlugin({
      title: 'TAF Styleguide experiment with Webpack and PostCSS'
    })
  ],

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  }
};