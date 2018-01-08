const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: __dirname + '/src/index.js',
  output: {
    path: process.cwd() + '/build',
    filename: '[name].[hash].bundle.js',
    publicPath: '/',
  },
  devtool: 'source-map',
  devServer: {
    port: 8080,
    publicPath: '/',
    contentBase: './build',
    hot: true,
    clientLogLevel: "none",
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
      "node_modules",
      path.resolve(__dirname, "./"),
    ],
    alias: {
      'single-spa': path.resolve(__dirname, 'node_modules/single-spa/lib/single-spa.js'),
      '_common': path.resolve(__dirname, './_common'),
    },
  },
  module: {
    rules: [
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

function getBabelConfig() {
  return {
    presets: [
      'react',
      ['babel-preset-env', {
        targets: {
          "browsers": ["last 2 versions"],
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
