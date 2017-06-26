var express = require('express');
var app = express();
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

var webpack = require('webpack');

var storeConfig = require('./config/webpack.store.config.js');

var compiler = webpack(storeConfig);

app.use(webpackDevMiddleware(compiler, {
    publicPath: '/bundle',
    stats: {
        colors: true
    },
    hot: true
}));

app.use(webpackHotMiddleware(compiler));

app.set('views', './app/views');
app.set('view engine', 'pug');

require('./app/controllers/BasicController')(app);

app.listen(3000, function () {
  console.log('Mobile Designer listening on port 3000!');
});