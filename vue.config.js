module.exports = {
    chainWebpack: webpackConfig => {
        webpackConfig.module
        .rule('glsl')
        .test(/.glsl$/)
        .use('glslify-loader')
        .loader('glslify-loader')
    }
  }