const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


function getBabelConfig() {
  return {
    presets: [
      'react',
      ['babel-preset-env', {
        targets: {
          browsers: ['last 2 versions'],
        },
      }],
    ],
    plugins: [
      'transform-object-rest-spread',
      'transform-class-properties',
      'syntax-dynamic-import',
      'transform-function-bind',
    ],
  };
}

module.exports = {
  entry: __dirname + '/src/index.js',
  output: {
    path: process.cwd() + '/build',
    filename: '[name].[hash].bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.jsx', '.js'],
    modules: [
      'node_modules',
      path.resolve(__dirname, './'),
    ],
    alias: {
      'single-spa': path.resolve(__dirname, 'node_modules/single-spa/lib/single-spa.js'),
      'common-components': path.resolve(__dirname, 'src/_common/components'),
      'common-action': path.resolve(__dirname, 'src/_common/action'),
      'common-constant': path.resolve(__dirname, 'src/_common/constant'),
      'common-reducer': path.resolve(__dirname, 'src/_common/reducer'),
      'common-saga': path.resolve(__dirname, 'src/_common/saga'),
      'common-service': path.resolve(__dirname, 'src/_common/service'),
      'common-store': path.resolve(__dirname, 'src/_common/store'),
      'common-utils': path.resolve(__dirname, 'src/_common/utils'),
    },
  },
  module: {
    rules: [
      {
        test: /\.png$/,
        loader: ExtractTextPlugin.extract('file-loader')
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('css-loader!less-loader')
      },
      {
        test: /\.js(x?)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: getBabelConfig(),
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('[name]-[contenthash].min.css'),
    new HtmlWebpackPlugin({
      title: 'OCEAN EXAPMLE',
      template: './index.hbs',
      filename: 'index.html'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      minChunks: module => module.context && module.context.indexOf('node_modules') !== -1
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      },
      minimize: true
    }),
  ],
};
