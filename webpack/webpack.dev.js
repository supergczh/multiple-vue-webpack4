const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

var webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const WriteFileWebpackPlugin = require('write-file-webpack-plugin')


let pathsToClean = [
  'dist'
]
const dev = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader', 
          'postcss-loader'
        ]
      },
      {
          test: /\.(scss|sass)$/,
          use: [
              'style-loader',
              "css-loader", // translates CSS into CommonJS
              "postcss-loader",
              "sass-loader" // compiles Sass to CSS, using Node Sass by default
            ]
       },
       {
        test: /\.less$/,
        use: [
          'style-loader',
          "css-loader", // translates CSS into CommonJS
          "postcss-loader",
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    compress: true,
    hot: true,
    host: 'localhost', 
    openPage: 'pages.html',
    historyApiFallback: true,
    open: true,
     // port: 9000,
    // quiet: false
  },
  plugins: [
    // new WriteFileWebpackPlugin(),
  ]
})
module.exports=dev