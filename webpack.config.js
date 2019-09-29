const HtmlWebpackPlugin = require('html-webpack-plugin');
//const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { VueLoaderPlugin } = require('vue-loader')

var path = require('path')

const devMode = process.env.NODE_ENV == 'development';

const mod = {
  mode: 'development',
  entry: [
    // "core-js/modules/es6.promise",
    //  "core-js/modules/es6.array.iterator",
    path.resolve(__dirname, "src/main.js"),
    //'./src/main.js'
  ],
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js', //chunks USAGE => https://webpack.js.org/guides/code-splitting/
    path: path.resolve(__dirname, './dist'),
    publicPath: devMode ? "/" : "./api/picture-manager/frontend/dist/",
    //publicPath: devMode ? '/dist' : './js/picture-manager/dist/',
    filename: 'build.js',
  },

  /* такая ошибочка была:
      https://apcis.tmou.org/develop/
      js/picture-manager/dist/
      js/picture-manager/dist/
      bg-image-flowers.jpg?af41f7588ecc023fafc49478e7ceba98
https://apcis.tmou.org/develop/js/picture-manager/dist/js/picture-manager/dist/bg-image-flowers.jpg?af41f7588ecc023fafc49478e7ceba98

исправил по етой инфе - https://webpack.js.org/loaders/file-loader/

publicPath: '',

https://apcis.tmou.org/develop/
js/picture-manager/dist/bg-image-flowers.jpg


      */
  plugins: [
    new HtmlWebpackPlugin({ template: './index.html', }),
    new webpack.HotModuleReplacementPlugin(),
    // new UglifyJsPlugin({ uglifyOptions: { warnings: false, ie8: false, output: { comments: false } } }),
    new VueLoaderPlugin(),// make sure to include the plugin for the magic
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    }),
  ],

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          devMode ? 'vue-style-loader'
            : {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: process.env.NODE_ENV === 'development',
                minimize: true,
                sourceMap: true
              },
            },
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          devMode ? 'vue-style-loader'
            : MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.styl(us)?$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'stylus-loader'
        ]
      },
      /*
      {
        test: /\.(sa|sc|c)ss$/,
        //exclude: /node_modules/,
        use: [
          { loader: "style-loader" }, // creates style nodes from JS strings
          { loader: "css-loader" }, // translates CSS into CommonJS
          { loader: "sass-loader?indentedSyntax" }, // compiles Sass to CSS
          { loader: "sass-loader" }, // compiles Sass to CSS
          devMode ? 'vue-style-loader'
            : {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: process.env.NODE_ENV === 'development',
                minimize: true,
                sourceMap: true
              },
            }
        ]
      },

*/
      // { test: /\.scss$/, use: ['vue-style-loader', 'css-loader', 'sass-loader'], },
      //  { test: /\.sass$/, use: ['vue-style-loader', 'css-loader', 'sass-loader?indentedSyntax'], },


      {
        test: /\.pug$/,
        oneOf: [
          // this applies to `<template lang="pug">` in Vue components
          {
            resourceQuery: /^\?vue/,
            use: ['pug-plain-loader']
          },
          // this applies to pug imports inside JavaScript
          {
            use: ['html-loader', 'raw-loader', 'pug-plain-loader']
          }
        ]
      },
      {
        test: /\.vue$/, loader: 'vue-loader', options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            'scss': ['vue-style-loader', 'css-loader', 'sass-loader'],
            'sass': ['vue-style-loader', 'css-loader', 'sass-loader?indentedSyntax']
          } // other vue-loader options go here
        }
      },
      {
        test: /\.js$/, //Regular expression
        exclude: /(node_modules|bower_components)/,/*excluded node_modules*/
        use: { loader: "babel-loader", options: { presets: ["@babel/preset-env"]/*Preset used for env setup*/ } }
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i, loader: 'file-loader?name=./js/picture-manager/dist/[name].[ext]',
        options: {
          name: '[name].[ext]',
          ///outputPath: 'images',
          publicPath: './',
        }
      },
      { test: /\.(woff|woff2|eot|ttf|otf)$/, use: ['file-loader'] },
      /*
            {
              test: /\.css$/,
              use: [
                'css-loader',
                'sass-loader',
                {
                  loader: 'postcss-loader',
                  options: {
                    ident: 'postcss',
                    plugins: [
                      // require('autoprefixer')({}),
                    ]
                  }
                }
              ],
            },
      */
    ]
  },
  resolve: {
    alias: { 'vue$': 'vue/dist/vue.esm.js' },
    extensions: ['*', '.js', '.vue', '.json']
  },
  performance: { /*hints: false*/ },
  devtool: '#eval-source-map',

};

module.exports = mod

