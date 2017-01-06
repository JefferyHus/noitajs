{
    const webpack = require("webpack");
    const path = require("path");

    module.exports = {
        entry: {
            js: './noita-dev.ts'
        },
        output: {
            path: './dist',
            library: 'noita',
            filename: 'noita.js'
        },
        module: {
            loaders: [
                {test: /\.ts$/, loader: 'babel-loader!ts-loader', exclude: [/node_modules/, /typings/]},
                {test: /jquery[\\\/]src[\\\/]selector\.js$/, loader: 'amd-define-factory-patcher-loader'},
                {test: /\.js$/, loader: 'babel-loader', query: {presets: ['es2015']}, exclude: [/node_modules/, /typings/]}
            ]
        },
        resolve: {
            extensions: ['', '.js', '.ts']
        }/*,
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                },
                sourceMap: false
            })
        ]*/
    }
}