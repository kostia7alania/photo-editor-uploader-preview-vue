const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');

module.exports = {
  entry: './src/main.js',
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' },
      { test: /\.vue$/, use: 'vue-loader' },
      { test: /\.css$/, use: ['vue-style-loader', 'css-loader']},
    ]
  },
  devServer: {
    open: true,
    hot: true,
    proxy: {
        '**': {
           target: 'https://apcis.tmou.org/test',
           secure: false,
           changeOrigin: true,
           onProxyRes(proxyRes, req, res) {
            if (proxyRes.headers.location) { // Если есть заголовок со свойством location (Где храниться полный адрес запроса к локальному серверу)
              let location = proxyRes.headers.location; // Сохраняем адрес зоголовка location из ответа в переменную location
              console.log(`LOCATION: ${proxyRes.headers.location}`); // Выводит в консоль адрес до замены
              location = location.replace('anyships.site', 'anyships.site:3000'); // Заменяем адрес локального сервера на адрес webpack dev server'a
              proxyRes.headers.location = location; // Присваиваем в заголовок location подмененный адрес из переменной location
              console.log(`REPLACED: ${proxyRes.headers.location}`); // Выводит в консоль адрес после замены
            }
          },
           //pathRewrite: { '^/api': '' }
        }
     }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ]
};