/* eslint-env node, mocha */
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ErrorOverlayPlugin = require("error-overlay-webpack-plugin");
const path = require("path");

const htmlPlugin = new HtmlWebPackPlugin({
    template: "./src/index.html",
    filename: "./index.html",
});


module.exports = {
    entry: ["./src/main.js"],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        publicPath: "/dist",
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader",
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader", // creates style nodes from JS strings
                    "css-loader", // translates CSS into CommonJS
                    "sass-loader", // compiles Sass to CSS, using Node Sass by default
                ],
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    devServer: {
        contentBase: "./dist",
        open: false,
        historyApiFallback: {
            index: "index.html",
        },
        proxy: {
            "/api": "http://localhost:3000",
        },
    },
    devtool: "cheap-module-source-map", // 'eval' is not supported by error-overlay-webpack-plugin
    plugins: [htmlPlugin, new ErrorOverlayPlugin()],
};
