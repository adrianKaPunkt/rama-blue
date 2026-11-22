import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // cacheComponents / partialPrefetching (Voreinstellung von create-next-app) sind bewusst aus:
  // Die Seite nutzt sie nicht, und der Cloudflare-Adapter unterstützt sie noch nicht vollständig.
  // https://github.com/opennextjs/opennextjs-cloudflare/pull/1318
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

// Cloudflare-Bindings (z. B. Images) auch im lokalen `next dev` verfügbar machen.
import("@opennextjs/cloudflare").then((m) => m.initOpenNextCloudflareForDev());
