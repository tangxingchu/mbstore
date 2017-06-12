var path = require('path');
var webpack = require('webpack');
var ROOT_PATH = path.resolve(__dirname, '..');


module.exports = {
    entry: ROOT_PATH + '/app/entry/store.js',
    resolve: {
        extensions: ['.js', '.jsx']
    },
    output: {
        filename: 'store.bundle.js',
        path: ROOT_PATH + '/bundle',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'react']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.json$/,
                use: {
                    loader: 'json-loader'
                }
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: {
                    loader: 'file-loader'
                }
            }
        ]
    }
};