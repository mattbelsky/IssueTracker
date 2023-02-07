const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    entry: './src/main/js/app.js',
    devtool: 'inline-source-map',
    devServer: {
        static: path.resolve(__dirname, 'src/main/resources/templates')
    },
    cache: true,
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'src/main/resources/static/built'),
        filename: 'bundle.js'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new ESLintPlugin()
    ],
    module: {
        rules: [
            {
                test: path.join(__dirname, '.'),
                exclude: /(node_modules)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                                '@babel/preset-react'
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                exclude: /(node_modules)/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    }
}