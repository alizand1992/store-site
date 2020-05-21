const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware(
      '/api', {
        pathRewrite: {
          '^/api/': '/'
        },
        target: 'http://localhost:5000/'
      }
    )
  );
};