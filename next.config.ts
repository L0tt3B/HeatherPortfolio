// import type { NextConfig } from "next";
// const isProd = process.env.NODE_ENV === "production";

// const nextConfig: NextConfig = {
//     assetPrefix: isProd ? "/HeatherPortfolio/" : "", 
//     basePath: isProd ? "/HeatherPortfolio" : "",
//     images: {
//       unoptimized: true, 
//     },
//     trailingSlash: true, // Fixes 404 errors in GitHub Pages
//     output: "export", 
// };

// export default nextConfig;

// next.config.js
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  basePath: isProd ? '/HeatherPortfolio' : '',
  assetPrefix: isProd ? '/HeatherPortfolio/' : '',
  images: {
    unoptimized: true, // Necessary for static exports
  },
  trailingSlash: true, // Ensures consistent routing
  output: 'export', // Prepares the app for static export
};

