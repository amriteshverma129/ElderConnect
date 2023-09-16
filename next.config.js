// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
    reactStrictMode: true,
    images: {
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        loader: "default",
        //path: "default",
        // remove this once its assets are in place
        domains: ["images.prismic.io", "imagedelivery.net", "loopvillagepro.wpengine.com"],
    },
    i18n: {
        defaultLocale: "en-us",
        locales: ["es-bo", "en-us"],
    },
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
    openAnalyzer: false,
});

module.exports = withBundleAnalyzer(nextConfig);
