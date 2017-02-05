{
    const webpack = require("webpack");
    const path = require("path");

    module.exports = {
        entry: {
            noita: './noita-dev.ts'
        },
        output: {
            path: path.resolve(__dirname, './dist'),
            library: 'noita',
            filename: '[name].bundle.js'
        },
        devServer: {
            contentBase: path.join(__dirname, "./"),
            compress: true,
            port: 9000
        },
        module: {
            rules: [
                {test: /\.ts$/, use: ['babel-loader','ts-loader'], exclude: [/node_modules/, /typings/]},
                {test: /jquery[\\\/]src[\\\/]selector\.js$/, loader: 'amd-define-factory-patcher-loader'},
                {test: /\.js$/, loader: 'babel-loader', options: {presets: ['es2015']}, exclude: [/node_modules/, /typings/]}
            ]
        },
        resolve: {
            extensions: ['.js', '.ts'],
            enforceExtension: false
        }/*,
        devtool: "source-map",
        plugins: [
            new UglifyJsPlugin({
                compress: {
                    warnings: true
                },
                sourceMap: true
            })
            new webpack.LoaderOptionsPlugin({
                minimize: true
            })
        ]*/
    }
}