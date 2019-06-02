const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
var webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");//单独打包css
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); 
const CleanWebpackPlugin = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;//一个打包模块可视化工具
const CopyPlugin = require('copy-webpack-plugin');
const pro = merge(common, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '/'
            },
          },
          'css-loader',
          "postcss-loader"
        ]
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '/'
            },
          }, // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          'postcss-loader',
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: '/'
            },
          }, // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          'postcss-loader',
          "sass-loader" 
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[id].[contenthash].css',
    }),
    new CleanWebpackPlugin(),
    new CopyPlugin([
      { from: './src/MP_verify_zAQusPCLd0GlzwA6.txt', to: './' },
    ]),
  ],
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
},
  optimization: {
    
    splitChunks: {
      cacheGroups: {
          vendor: {   // 抽离第三方插件
              test: /node_modules/,   // 指定是node_modules下的第三方包
              chunks: 'initial',
              name: 'vendor',  // 打包后的文件名，任意命名    
              // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
              priority: 10    
          }
      }
    },
    //  runtimeChunk: true,
     minimizer: [
       new TerserPlugin({
         cache: true,
         parallel: true
       }),
       new UglifyJsPlugin({
         uglifyOptions: {
             cache: true,
              // 在UglifyJs删除没有用到的代码时不输出警告
             parallel: true,
             sourceMap: false,
             compress: {
                 warnings: false,
                 // 删除所有的 `console` 语句，可以兼容ie浏览器
                 drop_console: true,
                 // 内嵌定义了但是只用到一次的变量
                 collapse_vars: true,
                 // 提取出出现多次但是没有定义成变量去引用的静态值
                 reduce_vars: true,
             },
             output: {
                 // 最紧凑的输出
                 beautify: false,
                 // 删除所有的注释
                 comments: false,
             }
         }
     }),
       new OptimizeCSSAssetsPlugin({}),
      
      //  new BundleAnalyzerPlugin()
     ]
   },
   stats: {
       warningsFilter: (warning) => /Conflicting order between/gm.test(warning)
    },
   mode: 'production'
})


module.exports =pro