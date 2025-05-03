/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // distDir: "build",
  output: "export",
  images: {
    unoptimized: true,
  },
  publicRuntimeConfig: {
    manifest: {
      name: "fajarr.space",
      short_name: "Fajar A",
      start_url: "https://fajarr.space",
      background_color: "#ffffff",
      theme_color: "#000000",
      display: "standalone",
      icons: [
        {
          src: "/android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },
  },
};

module.exports = nextConfig;
