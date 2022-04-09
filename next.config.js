const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  reactStrictMode: true,
  i18n: {
    locales: ["en", "fr", "ar"],
    defaultLocale: "fr",
  },
  env: {
    ROOT: __dirname,
  },
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
  pwa: {
    dest: "public",
    // disable: process.env.NODE_ENV === "development",
    register: true,
    skipWaiting: true,
    runtimeCaching,
  },
});

module.exports = nextConfig;
