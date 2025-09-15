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
        generator: { filename: "assets/fonts/[name][ext]" },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(PUBLIC, "index.html"),
      favicon: path.join(PUBLIC, "images/favicon-32x32.png"),
    }),
  ],
};
