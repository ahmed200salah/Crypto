import { Module } from "module";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};
export default nextConfig;

Module.exports = {
  webpack(config, options) {
    config.module.rules.push({
      test: /\.(mp3)$/,
      type: "../crypto-app/public/Sounds",
      use: {
        loader: "file-loader",

        options: {
          publicPath: "../crypto-app/public/sounds/",
          outputPath: "../crypto-app/public/sounds/",
        },
      },
    });
    return config;
  },
};
