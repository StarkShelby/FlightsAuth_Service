const { createProxyMiddleware } = require("http-proxy-middleware");
function createServiceProxy(target) {
  return createProxyMiddleware({
    target,
    changeOrigin: true,

    on: {
      proxyReq: (proxyReq, req) => {
        console.log("Proxying:", req.method, req.originalUrl);
      },

      proxyRes: () => {
        console.log("Response received");
      },

      error: (err) => {
        console.log(err.message);
      },
    },
  });
}
module.exports = createServiceProxy;
