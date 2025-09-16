# ch6. HMR(Hot Module Replacement) 적용하기

## 목표

- 개발 환경에 HMR 적용하기

## 상세

### HMR

- 애플리케이션 작동중에 모듈 전체 full reload 없이 모듈을 교체하거나 추가, 제거하는 것
- 개발 속도를 크게 높일 수 있다
  - full reload 중에 손실되는 상태(메모리) 유지
  - 변경된 사항만 갱신하여 시간 절약
  - 변경사항이 브라우저에 바로 업데이트됨

webpack에서 development mode의 경우 기본적으로 HMR이 적용되지만, React 환경에서 HMR이 더 잘 적용되도록 해본다. 2가지 패키지가 필요하다.

- react-refresh
  - React 공식 Fast Refresh 런타임
  - 번들러의 모듈 업데이트를 받아서 React 리렌더링를 제어
  - 개발 전용으로 사용
- @pmmmwh/react-refresh-webpack-plugin
  - Webpack과 react-refresh 런타임을 연결
  - dev server와 연동해 변경 모듈을 푸시
  - 개발 전용으로 사용
  - 트랜스파일러(SWC)와 연동 필요

필요한 패키지 설치

```bash
pnpm add -D react-refresh @pmmmwh/react-refresh-webpack-plugin
```

webpack.dev.js 수정

- @pmmmwh/react-refresh-webpack-plugin 플러그인 추가
- dev server 설정에서 hot: true 추가
- swc에서 refresh를 지원하게 수정
- webpack.dev.js

```js
// ...
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = merge(common, {
  //...
  devServer: {
    static: { directory: PUBLIC },
    port: 12345,
    open: true,
    historyApiFallback: true,
    hot: true,
  },
  // ...
  plugins: [new ReactRefreshWebpackPlugin()],
});
```

- .swcrc 를 수정: jsc.transform.react.runtime
  - JSX 트랜스폼 방식을 automatic runtime으로 구성하여 매번 파일 상단에 React import할 필요가 없어지고 트리셰이킹, 번들 크기 최적화 지원

```json
{
  "jsc": {
    "target": "es2020",
    "parser": { "syntax": "typescript", "tsx": true },
    "transform": { "react": { "runtime": "automatic" } }
  },
  "sourceMaps": true
}
```
