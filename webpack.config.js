const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {

    entry: './src/js/index.js',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },

    devServer: {
        publicPath: "/",
        hot: true
    },

    module: {
        rules: [

            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },

            {
                test: /\.(sa|sc|c)ss$/,

                use: [
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "postcss-loader"
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            implementation: require("sass")
                        }
                    },
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: "css-loader",
                    },
                ]
            },

            {

                test: /\.(png|jpe?g|gif|svg)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            outputPath: 'img'
                        }
                    }
                ]
            },

            // {
            //     test: /\.(woff|woff2|ttf|otf|eot)$/,
            //     use: [
            //         {
            //             loader: "file-loader",
            //             options: {
            //                 outputPath: 'fonts'
            //             }
            //         }
            //     ]
            // }
        ]
    },

    plugins: [

        new MiniCssExtractPlugin({
            filename: "bundle.css"
        }),

        new CopyWebpackPlugin([
            {from:'src/img',to:'img'}
        ])

    ],

    mode: 'development'
};