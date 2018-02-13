//需要使用的webpack配置文件
let realFileName = './webpack.config.prod.babel';

//检测是否定义了环境变量,没有定义,使用默认的development
if (process.env.NODE_ENV === undefined) {
  console.log('NODE_ENV is undefind! use default [development].');
  process.env.NODE_ENV = 'development';
}
if (process.env.NODE_ENV === 'development') {
  realFileName = './webpack.config.dev.babel';
}

console.log(`process.env.NODE_ENV=${process.env.NODE_ENV}.`);
console.log(`use webpack config file :"${realFileName}"`);

const options = require('./Config');

const devMiddleware = ['webpack-dev-server/client?http://localhost:8888', 'webpack/hot/only-dev-server'];
for (const i in options.entry) {
  if ( i ) {
    let temp = options.entry[i]
    if ( process.env.NODE_ENV === 'development' ) {
      temp = devMiddleware.concat( temp )
    }
  }
}
const config = require(realFileName)(options);
module.exports = config;
