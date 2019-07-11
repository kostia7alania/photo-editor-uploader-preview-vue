const conf = require('./webpack.config.js')
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');


var OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');


conf.mode = 'production'

conf.optimization = {
  minimize: true,
  // sourceMap: false,
  minimizer: [
    new TerserPlugin({
      parallel: true,
      extractComments: true,
      cache: true,
      cacheKeys: (defaultCacheKeys) => {
        delete defaultCacheKeys.terser;
        return Object.assign(
          {},
          defaultCacheKeys,
          { 'uglify-js': require('uglify-js/package.json').version },
        );
      },
      terserOptions: {
        ecma: 6,
        compress: true,
        ie8: false,
        safari10: false,
        output: {
          comments: false,
          beautify: false
        }
      },
      minify: (file, sourceMap) => {


        const uglifyJsOptions = {// https://github.com/mishoo/UglifyJS2#minify-options
          /* your `uglify-js` package options */
        };
        if (sourceMap) { uglifyJsOptions.sourceMap = { content: sourceMap, }; }

        const extractedComments = [];
        // Custom logic for extract comments
        // const { error, map, code, warnings } = require('./functions') // Or require('./path/to/uglify-module')
        //   .minify(file, { //Your options for minification
        //   });
        //return { error, map, code, warnings, extractedComments };

        return require('uglify-js').minify(file, uglifyJsOptions);

      },
    }),
    new OptimizeCSSAssetsPlugin({
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      }
    })
  ]
};

//module.exports = { optimization: { minimizer: [new UglifyJsPlugin()], }, };
module.exports.devtool = '#source-map' // http://vue-loader.vuejs.org/en/workflow/production.html
module.exports.plugins = (module.exports.plugins || []).concat([
  new webpack.DefinePlugin({ 'process.env': { NODE_ENV: '"production"' } }),
  //new webpack.optimize.UglifyJsPlugin({ sourceMap: true, compress: { warnings: false } }),
  new webpack.LoaderOptionsPlugin({ minimize: true })
])

module.exports = conf


