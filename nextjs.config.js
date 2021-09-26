const path = require("path");

module.exports = {
    // target: "experimental-serverless-trace", // switching to netlify
    reactStrictMode: true,
    images: {
        domains: ["image.tmdb.org"],
    },

    trailingSlash: false,
    webpackDevMiddleware: (config) => {
        config.watchOptions = {
            poll: 1000,
            aggregateTimeout: 300,
        };

        return config;
    },
    sassOptions: {
        includePaths: [path.join(__dirname, "styles")],
    },
};
