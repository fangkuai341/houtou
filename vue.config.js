const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  lintOnSave: false,
  devServer: {
    host: 'localhost',
    port: 8080,
    open: true,
    proxy: {
      '/wenzi': {
        target: 'http://localhost:8080',
        changeOrigin: false,
        ws: false,
      }
    },
  },
}
)

