import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config, context) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        context.defaultLoaders.babel,
        {
          loader: "@svgr/webpack",
          options: {
            icon: true,
          },
        },
      ],
    });
    
    return config;
  }
};

export default nextConfig;
