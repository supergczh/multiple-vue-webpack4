/** 用于开发环境的服务启动 **/
const path = require("path");			// 获取绝对路径有用
const express = require("express");		// express服务器端框架
const webpack = require("webpack");		// webpack核心

// const env = process.env.NODE_ENV;      
const env = process.env.npm_lifecycle_event;       //
const app = express();                      // 实例化express服务
const PORT = 9008;                          // 服务启动端口号

if (env === 'build:test') {                 // 生产环境，则运行build文件夹中的代码
    app.use(express.static('dist'));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'pages.html'));
    });
} 
/** 启动服务，监听PORT端口 **/
app.listen(PORT, () => {
    console.log('服务已启动: http://localhost:%s', PORT);
});
