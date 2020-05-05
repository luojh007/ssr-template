require('css-modules-require-hook/preset');
var less = require('postcss-less')
require('css-modules-require-hook')({
  extensions: ['.less', '.css'],
  // preprocessCss: function (css, filename) {
  //   return less(css).set('filename', filename).render();
  // },
  generateScopedName: '[name]__[local]___[hash:base64:5]',
  processorOpts: { parser: less.parse }
})
require('asset-require-hook')({
  extensions: ['.jpg', '.png', '.gif', '.jpeg', '.svg'],
  name: 'static/images/[name].[hash:7].[ext]'
})
require('@babel/register')({
  presets: [
    '@babel/preset-react',
    '@babel/preset-env'
  ]
})

require('./app')