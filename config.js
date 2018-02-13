//todo: 静态资源目录名称,需要修改
const moduleName = 'ocean';

module.exports = {
  title: 'ocean example',
  context: '', //todo: 二级目录
  moduleName,
  pathInMappingJson: `//localhost:8080/${moduleName}/`,
  entry: {
    vendor: [
      'antd', 'axios', 'classnames', 'prop-types', 'react',
      'react-dom', 'react-redux', 'react-router-dom', 'redux',
      'redux-saga',
    ],
    [`${moduleName}`]: ['babel-polyfill', './src/index.js']
  },
  html: [{
    filename: `${moduleName}.html`,
    template: './index.hbs',
    chunks: ['vendor', `${moduleName}`]
  }]
};
