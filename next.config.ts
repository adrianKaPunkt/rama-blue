import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      // Tailwind für alle CSS-Dateien. CSS-Module (*.module.css) müssen dabei Module bleiben,
      // sonst werden ihre Klassen- und Keyframe-Namen nicht eindeutig gemacht.
      "*.css": [
        {
          condition: { path: /\.module\.css$/ },
          loaders: ["@tailwindcss/turbopack"],
          as: "*.module.css",
        },
        {
          condition: { not: { path: /\.module\.css$/ } },
          loaders: ["@tailwindcss/turbopack"],
          as: "*.css",
        },
      ],
    },
  },
};

export default nextConfig;
