//todo: 静态资源目录名称,需要修改
const moduleName = 'ocean';

module.exports = {
  title: 'ocean example',
  context: '', //todo: 二级目录
  moduleName,
  pathInMappingJson: `//localhost:8888/${moduleName}/`,
  entry: {
    vendor: [
      'antd', 'axios', 'classnames', 'prop-types', 'react',
      'react-dom', 'react-redux', 'react-router-dom', 'redux',
      'redux-saga', 'single-spa', 'single-spa-react'
    ],
    [`${moduleName}`]: [`./src/index.js`]
  },
  html: [{
    filename: `${moduleName}.html`,
    template: './index.hbs',
    chunks: ['vendor', `${moduleName}`]
  }]
};
