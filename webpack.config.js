{
    const webpack = require("webpack");
    const path = require("path");

    module.exports = {
        entry: {
            js: './noita-dev.ts'
        },
        output: {
            path: './dist',
            filename: 'noita.js'
        },
        module: {
            loaders: [
                {test: /\.ts$/, loader: 'ts-loader', exclude: [/node_modules/, /typings/]},
                {test: /\.js$/, loader: 'babel-loader', exclude: [/node_modules/, /typings/]}
            ]
        },
        resolve: {
            extensions: ['', '.js', '.ts']
        },
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                },
                sourceMap: false
            })
        ]
    }
}