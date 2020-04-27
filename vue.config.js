module.exports = {
  transpileDependencies: ["vuetify"],

  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: false
    }
  },
  devServer: {
    proxy: {
      "^/api": {
        target: "http://localhost:8888"
        //ws: true,
        //changeOrigin: true
      },
      "^/files/": {
        target: "http://localhost:8888"
        //ws: true,
        //changeOrigin: true
      }

    }
  },
  chainWebpack: config => {
    config.module
      .rule('ify-loader')
      .test(/\.js$/)
      .use("ify-loader")
      .loader("ify-loader");
  }
};
