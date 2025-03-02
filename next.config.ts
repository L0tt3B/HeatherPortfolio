const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  basePath: isProd ? '/HeatherPortfolio' : '',
  assetPrefix: isProd ? '/HeatherPortfolio/' : '',
  images: {
    unoptimized: true, 
  },
  trailingSlash: true,
  output: 'export',
};

