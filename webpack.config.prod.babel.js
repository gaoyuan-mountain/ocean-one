const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const appPath = path.resolve(__dirname, 'public');
const lessToJs = require('less-vars-to-js');

const antDefaultVarsPath = path.join(__dirname, 'src/style/ant-default-vars.less');
const themeVariables = lessToJs(fs.readFileSync(antDefaultVarsPath, 'utf8'));
// themeVariables["@icon-url"] = "'//localhost:8080/fonts/iconfont'"; //如果需要把字体文件配置到本地

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

const extractCSS = new ExtractTextPlugin({
  filename: 'css/style.[name].[chunkhash].css',
  allChunks: true
});
const loadConfig = (options) => {

  // 定义根目录上下文，因为有的项目是用二级路径区分的
  const context = options.context;
  const entry = options.entry;
  const pathInMappingJson = options.pathInMappingJson;
  delete entry.vendor;
  const webpackConfig = {
    devtool: 'source-map', // 生成 source-map文件 原始源码
    resolve: {
      extensions: ['.js', '.jsx', '.css', '.less', '.png', '.jpg', '.gif'],
      //模块别名定义，方便直接引用别名
      alias: {
        'component': path.resolve(__dirname, './src/component'),
        'service': path.resolve(__dirname, './src/service'),
      },
      modules: [
        'src',
        'node_modules',
      ],
    },
    entry,
    output: {
      path: path.join(appPath, 'dist'),
      filename: '[name].[chunkhash].js',
      publicPath: `${context}/dist/`,
      sourceMapFilename: 'map/[file].map',
    },

    module: {
      rules: [
        {
          test: /\.js(x?)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: getBabelConfig(),
        },
        // https://github.com/webpack/url-loader
        {
          test: /\.(png|jpg|gif)$/,
          use: {
            loader: 'url-loader',
            options: {
              name: '[hash].[ext]',
              limit: 100000, // 100kb
            }
          }
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
      ],
    },
    plugins: [
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        }
      }),
      extractCSS,
      new ManifestPlugin({
        fileName: 'mapping.json',
        publicPath: `${pathInMappingJson}`,
        seed: {
          title: options.title
        }
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
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: true,
        options: {
          // eslint 配置
          eslint: {
            emitError: true, // 验证失败，终止
            configFile: '.eslintrc.js'
          },
        }
      }),
      new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: require('./public/dll/vendor-manifest.json')
      })
    ],
  }
  return webpackConfig;
}

module.exports = loadConfig;

