const conf = require('./webpack.config.js')

conf.mode = 'development'
conf.devServer = {
  historyApiFallback: true, // noInfo: true,
  overlay: true,//вывод ошибок на экран
  open: false,
  hot: true,
  proxy: {
    '/api*': {//все запросы))
      target: 'https://apcis.tmou.org/test/',
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
      pathRewrite: { '^/api': '' }
    }
  }
},
  module.exports = conf