const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ROOT, SRC, DIST, PUBLIC } = require("./path");

module.exports = {
  context: ROOT, // 설정파일이 ./webpack/에 있어도 기준을 프로젝트 루트 경로로 고정
  entry: path.join(SRC, "main.tsx"),
  output: {
    path: DIST,
    filename: "assets/[name].js",
    clean: true,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(woff2?|ttf|otf|eot)$/i,
        type: "asset/resource",
        generator: { filename: "assets/fonts/[name].[contenthash][ext]" },
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        exclude: [path.join(PUBLIC, "favicons")],
        type: "asset/resource",
        generator: { filename: "assets/images/[name].[contenthash][ext]" },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(PUBLIC, "index.html"),
      favicon: path.join(PUBLIC, "favicons/favicon-32x32.png"),
    }),
  ],
};
