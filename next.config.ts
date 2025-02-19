const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  assetPrefix: isProd ? "/HeatherPortfolio/" : "",
  basePath: isProd ? "/HeatherPortfolio" : "",
  trailingSlash: true, // ✅ Required for GitHub Pages
  images: { unoptimized: true }, // ✅ Ensures images work correctly
  output: "export", // ✅ Ensures full static export
};

export default nextConfig;
