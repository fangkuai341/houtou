const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  lintOnSave: false,
  devServer: {
    host: 'localhost',
    port: 8080,
    open: true,
    proxy: {
      '/wenzi': {
        target: 'http://139.224.162.183/',
        changeOrigin: false,
        ws: false,
      },
      '/getmsg': {
        target: 'http://139.224.162.183/',
        changeOrigin: false,
        ws: false,
      }
    },
  },
}
)

