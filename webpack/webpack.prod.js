const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const common = require("./webpack.common");

module.exports = merge(common, {
  devtool: "nosources-source-map", // 맵 배포 + 소스 미포함
  output: {
    filename: "assets/[name].[contenthash].js",
    chunkFilename: "assets/[name].[contenthash].js", // 코드 스플리팅된 청크에도 content hash 적용
  },
  optimization: {
    runtimeChunk: "single", // 런타임 코드를 별도 청크로 분리하여 연쇄 영향 제한
    moduleIds: "deterministic", // 청크 내용 연쇄 변경 제한
    splitChunks: {
      chunks: "all", // 코드 스플리팅된 청크들에도 적용
      cacheGroups: {
        vendors: {
          // 외부 의존성을 vendors 이름의 청크로 모음
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
    // Keep default JS minimizer and add CSS minimizer
    minimizer: ["...", new CssMinimizerPlugin()],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "assets/[name].[contenthash].css",
      chunkFilename: "assets/[name].[contenthash].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: "swc-loader",
          options: {
            jsc: { transform: { react: { development: false } } },
          },
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, { loader: "css-loader", options: { importLoaders: 1 } }, "postcss-loader"],
      },
    ],
  },
});
