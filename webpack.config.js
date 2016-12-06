// function isExternal(module) {
//     var userRequest = module.userRequest;

//     if (typeof userRequest !== 'string') {
//         return false;
//     }

//     return userRequest.indexOf('node_modules') >= 0;
// }

var path = require('path');

var Webpack = require('webpack');
var host = process.env.APP_HOST || 'localhost';
var entryPath = path.resolve(__dirname, 'client', 'js', 'app.js');
var autoprefixer = require('autoprefixer-core');

var config = {
    devtool: 'eval',
    entry: [
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://' + host + ':3001',
        entryPath
    ],
    output: {
        path: path.resolve(__dirname, 'public', 'js'),
        filename: 'bundle.js',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: 'style!css!postcss'
            },
            {
                test: /\.less$/,
                loader: 'style!css!postcss!less'
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            }
        ]
    },
    postcss: [autoprefixer],
    plugins: [
        new Webpack.HotModuleReplacementPlugin(),
        new Webpack.ProvidePlugin({
            _: "lodash"
        })
    ]
};

module.exports = config;