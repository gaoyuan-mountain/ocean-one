const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const lessToJs = require('less-vars-to-js');

const antDefaultVarsPath = path.join(__dirname, 'src/_common/style/ant-default-vars.less');
const themeVariables = lessToJs(fs.readFileSync(antDefaultVarsPath, 'utf8'));
// themeVariables["@icon-url"] = "'//localhost:8080/fonts/iconfont'"; //如果需要把字体文件配置到本地

module.exports = {
  entry: __dirname + '/src/index.js',
  output: {
    path: process.cwd() + '/build',
    filename: '[name].[hash].bundle.js',
    chunkFilename: '[name].bundle.js',
    publicPath: '/',
  },
  devtool: 'source-map',
  devServer: {
    port: 8080,
    publicPath: '/',
    contentBase: './build',
    hot: true,
    clientLogLevel: 'none',
    proxy: {
      '/api': {
        target: 'http://localhost:7001',
        pathRewrite: {
          '^/api': ''
        },
      },
    },
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
      'common-utils': path.resolve(__dirname, 'src/_common/utils')
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
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'postcss-loader',
            {
              loader: 'less-loader',
              options: {
                modifyVars: themeVariables
              }
            }
          ]
        })
      },
      {
        test: /\.js(x?)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new ExtractTextPlugin('[name]-[contenthash].min.css'),
    new HtmlWebpackPlugin({
      title: 'OCEAN EXAPMLE',
      template: './index.hbs',
      filename: 'index.html'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      minChunks: module => module.context && module.context.indexOf('node_modules') !== -1
    })
  ],
};
