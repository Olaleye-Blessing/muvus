// If you want to use other PostCSS plugins, see the following:
// https://tailwindcss.com/docs/using-with-preprocessors
// module.exports = {
//   plugins: {
//     tailwindcss: {},
//     autoprefixer: {},
//   },
// }
// module.exports = {
//     plugins: {
//         tailwindcss: {},
//         autoprefixer: {},
//         "postcss-import": {},
//         "postcss-flexbugs-fixes": {},
//         "postcss-preset-env": {
//             autoprefixer: {
//                 flexbox: "no-2009",
//             },
//             stage: 3,
//             features: {
//                 "custom-properties": false,
//             },
//         },
//     },
// };
// module.exports = {
//   plugins: {
//     tailwindcss: {},
//     autoprefixer: {},
//   },
// }
// If you want to use other PostCSS plugins, see the following:
// https://tailwindcss.com/docs/using-with-preprocessors
module.exports = {
    plugins: {
        tailwindcss: {},
        autoprefixer: {},
        "postcss-nested": {},
        "postcss-easy-import": { prefix: "_", extensions: [".css", ".scss"] },
    },
};
