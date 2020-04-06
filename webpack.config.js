
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
module.exports = {
    mode: 'production',
    entry: {
        app: './src/index.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: __dirname + '/dist'
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader','css-loader']},
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },{
                test: /\.(woff|woff2|eot|ttf|otf|png|svg|jpg|gif)$/,
                loader: 'file-loader'
            }
        ],
    },
    plugins: [
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
}