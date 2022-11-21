const path = require("path");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
    entry: "./src/js/index.js", // 자바스크립트 파일의 진입점 설정
    output: { // 빌드 시 번들 속성
        filename: "bundle.js",
        path: path.resolve(__dirname, "./dist"), // 상대 경로 X, 절대 경로로 설정
        clean: true
    },

    plugins: [
        new HTMLWebpackPlugin({
            title: "keybord",
            template: "./index.html",
            inject: "body",
            favicon: "./favicon.ico"
        }),

        new MiniCssExtractPlugin({
            filename: "style.css"
        })
    ],

    module: { // css 읽는 방법 설정
        rules: [
            {
                test: /\.css$/,
                use: [ MiniCssExtractPlugin.loader, "css-loader" ]
            }
        ]
    },

    devtool: "source-map", // 빌드 파일과 원본 파일을 서로 연결
    mode: "development",
    optimization: {
        minimizer: [
            new TerserWebpackPlugin(),
            new CssMinimizerPlugin()
        ]
    },

    devServer: {
        host: "localhost",
        port: 8080,
        open: true,
        watchFiles: "index.html"
    }
}