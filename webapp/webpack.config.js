/* eslint-env node, mocha */
const path = require("path");
const glob = require("glob");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ErrorOverlayPlugin = require("error-overlay-webpack-plugin");
const ExtractCssPlugin = require("mini-css-extract-plugin");
const PurgecssPlugin = require("purgecss-webpack-plugin");


module.exports = (env, options) => {
    const devMode = options.mode !== "production";
    const PATHS = {
        src: path.join(__dirname, "src"),
    };
    const plugins = [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html",
        }),
        new ErrorOverlayPlugin(),
        new ExtractCssPlugin(),
    ];

    if (!devMode) {
        plugins.push(
            new PurgecssPlugin({
                paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
                whitelist: ["whitelisted"],
            }),
        );
    }

    return {
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
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        {
                            loader: ExtractCssPlugin.loader,
                            options: {
                                sourceMap: true,
                                url: false,
                            },
                        },
                        "css-loader",
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: true,
                                url: false,
                            },
                        },
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
        plugins,
        devtool: "cheap-module-source-map",
    };
};
