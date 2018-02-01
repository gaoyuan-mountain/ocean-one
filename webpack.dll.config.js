const webpack = require('webpack');

const vendors = [
  'antd', 'axios', 'classnames', 'prop-types', 'react',
  'react-dom', 'react-redux', 'react-router-dom', 'redux',
  'redux-saga', 'single-spa', 'single-spa-react'
];

module.exports = {
  output: {
    path: process.cwd() + '/build/cached',
    filename: '[name].dll.js',
    library: '[name]Library',
  },
  entry: {
    vendor: vendors,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.DllPlugin({
      path: process.cwd() + '/build/cached/manifest.json',
      name: '[name]Library'
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compressor: {
        warnings: false,
      },
      mangle: {
        except: [] // 设置不混淆变量名
      }
    }),
  ],
};
