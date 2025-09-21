# ch8. 번들 분석

## 목표

- webpack bundle analyzer 도구 사용해서 번들을 얼마나 최적화했는지 수치 확인

## 상세

### Webpack Bundle Analyzer

번들 분석 라이브러리로 확인할 수 있는 것들

- 번들에 실제로 무엇이 있는지
- 번들 크기의 대부분을 차지하는 모듈이 무엇인지
- 의도치 않게 실수로 포함된 모듈이 있는지

사용시 주의사항

- 개발 환경에서는 굳이 사용할 필요 없으니 배포 환경에만 세팅하기 (webpack.prod.js 파일에만 추가)

플러그인 추가

- 모듈 크기를 웹페이지에서 시각적으로 확인할 수 있게 server 설정하고, 배포시 리포트 페이지를 자동으로 실행

- webpack.prod.js

```js
// ...
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = merge(common, {
  // ...
  plugins: [
    new MiniCssExtractPlugin({
      filename: "assets/[name].[contenthash].css",
      chunkFilename: "assets/[name].[contenthash].css",
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: "server", // 터미널에서 별도 서버를 실행해서 리포트를 확인
      openAnalyzer: true, // 리포트 페이지를 바로 띄우기
    }),
  ],
  // ...
});
```
