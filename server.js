const express = require('express');
const vhost = require('vhost');

const webpack = require('webpack')
const middleware = require('webpack-dev-middleware');
const compiler = webpack(require('./webpack.config'));

const app = express();

app.use(vhost('www.base.com', app.use(middleware(compiler))));
app.use(vhost('www.taf.com', app.use(middleware(compiler))));

app.listen(80, () => console.log('Server started..'));