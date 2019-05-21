const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackBar = require('webpackbar');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
var glob = require('glob')

// 根据项目具体需求，输出正确的 js 和 html 路径
function getEntry(globPath) {
  var Entrys = {},
    pathname;

  glob.sync(globPath).forEach(function (entry) {
    pathname = entry.split('/').splice(-3, 2).join('/'); // 正确输出 js 和 html 的路径
    Entrys[pathname] = entry;
  });
  return Entrys;
}


var Entrys = getEntry('./src/**/main.js'); // 获得入口 js 文件
var pages = getEntry('./src/**/*.html');// 获得入口 html文件
var chunks = Object.keys(Entrys);



const pathsToClean = [
  'dist'
]

const Output=process.env.NODE_ENV=='production'?{
  path: path.resolve(__dirname, '..', 'dist'),
  filename:'js/[name]-[chunkhash:8].chunk.js',
  chunkFilename: "js/[name].[chunkhash:8].chunk.js",
  publicPath: '../'
}:{
  path: path.resolve(__dirname, '..', 'dist'),
  filename:'js/[name].bundle.js',
  publicPath: './'
}

module.exports ={
 
  entry:Entrys,
  output: Output,
  resolve: {
    extensions: ['*', '.js', '.json', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      // '@': path.resolve(__dirname, '../src'),
    }
  },
  module: {
    rules: [
      {
        // .js 用babel解析
        test: /\.js?$/,
        exclude: /node_modules/, // 排除不处理的目录
        include: path.resolve(__dirname, "../src"),
        use: ["babel-loader"]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000
          }
        }]
      }
    ]
  },
  plugins: [
    
    // new HtmlWebpackPlugin({
    //   title: 'vue',
    //   filename: 'index.html',
    //   template: 'src/pages/index.html',
    //   chunks: ["app"],
    //   // favicon:'public/favicon.ico',//网页icon
    // }),
    new VueLoaderPlugin(),
    new WebpackBar()
  ]
}
// if(process.env.NODE_ENV=='production'){
    for (var pathname in pages) {
      // 配置生成的 html 文件，定义路径等
      var conf = {
        filename: pathname.split('/')[1]+ '.html', // html 文件输出路径
        template: pages[pathname], // 模板路径
        inject: true,              // js 插入位置
        minify: {
          removeComments: true,
          collapseWhitespace: false
        }
      };
      if (pathname in Entrys) {
        conf.chunks = ['vendors', pathname];
        conf.hash = false;
      }
      
      // 需要生成几个 html 文件，就配置几个 HtmlWebpackPlugin 对象
      module.exports.plugins.push(new HtmlWebpackPlugin(conf));
    }
// }

