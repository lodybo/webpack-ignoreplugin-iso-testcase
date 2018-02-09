const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const DiscardAssetPlugin = require('./discard-asset-webpack-plugin');

const baseStyle = new ExtractTextPlugin('styles/base-theme.css');
const brand1Style = new ExtractTextPlugin('styles/brand1-theme.css');
const brand2Style = new ExtractTextPlugin('styles/brand2-theme.css');


module.exports = {
  entry: {
    'app': path.join(__dirname, 'src', 'app.js'),
    'themes': path.join(__dirname, 'src', 'themes.js')
  },

  devtool: 'inline-source-map',

  devServer: {
    contentBase: path.join(__dirname, 'dist')
  },

  module: {
    rules: [
      {
        test: path.join(__dirname, 'src', 'css', 'base-theme.css'),
        use: baseStyle.extract({
          use: [
            { loader: 'css-loader', options: { importLoaders: 1 } },
            'postcss-loader'
          ]
        })
      },
      {
        test: path.join(__dirname, 'src', 'css', 'brand1-theme.css'),
        use: brand1Style.extract({
          use: [
            { loader: 'css-loader', options: { importLoaders: 1 } },
            'postcss-loader'
          ]
        })
      },
      {
        test: path.join(__dirname, 'src', 'css', 'brand2-theme.css'),
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
    baseStyle,
    brand1Style,
    brand2Style,
    new HtmlWebpackPlugin({
      title: 'TAF Styleguide experiment with Webpack and PostCSS',
      excludeAssets: [/.*.css/, /themes.*.js/],
      minify: false,
      template: path.join(__dirname, 'src', 'index.tpl.html')
    }),
    new DiscardAssetPlugin({
      discardPatterns: [/themes.*.js/]
    }),
    new HtmlWebpackExcludeAssetsPlugin(),
  ],

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  }
};