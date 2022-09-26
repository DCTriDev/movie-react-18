const path = require('path')

module.exports = {
  webpack: {
    alias: {
      '@src': path.resolve(__dirname, 'src/'),
      '@api': path.resolve(__dirname, 'src/api'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@config': path.resolve(__dirname, 'src/config'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@redux': path.resolve(__dirname, 'src/redux'),
      '@routers': path.resolve(__dirname, 'src/routers'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@templates': path.resolve(__dirname, 'src/templates'),
      '@utils': path.resolve(__dirname, 'src/utils/'),
    },
  },
}
