const dev = require('./webpack/webpack.dev.js');
const prod = require('./webpack/webpack.prod.js');
console.log(1212121,process.env.NODE_ENV);
if(process.env.NODE_ENV!=='production') {
  module.exports = dev
}else{
  module.exports = prod
}
