const path = require("path");

// module.exports = {
//     entry: {
//         index: path.resolve(__dirname, "./src/js", "app.js")
//     },
//     output: {
//         path: path.resolve(__dirname, "./dist/js/")
//     }
// };


module.exports = {
    entry: './src/js/app.js',
    output: {
        path: path.resolve(__dirname, "./dist/js/"),
        filename: "bundle.min.js"
    },
    watch: false,
    mode: 'production',
    devtool: 'source-map',
    module: {
        rules: [{
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        }]
    }
}