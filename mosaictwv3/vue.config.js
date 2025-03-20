const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production' 
    ? '/MosaicCasteller/'  // Change this if your GitHub repo name is different
    : '/'
})