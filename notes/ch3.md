# ch3. Webpack으로 dev server 띄우고 용도별 분할 및 편의 기능 추가하기

## 목표

- dev server 띄우기
- HTML Webpack 플러그인 사용해서 자동으로 index.html 파일 만들기
- 용도에 맞게 webpack config 분리하고 폴더에 넣어 가독성 챙기기

## 상세

코드가 바뀔 때마다 매번 정적으로 빌드하는 것은 번거롭다. Webpack을 사용해서 번들링이 자동으로 실행되게 개발 서버를 띄워본다.

### dev server 세팅

- 의존성 설치

```bash
pnpm add -D webpack-dev-server
```

webpack config 에서 devserver 설정 추가

- webpack.config.js

```js
  devServer: {
    static: { directory: "public" }, // 정적 파일들(html 등)이 위치한 경로
    port: 12345, // 포트번호
    open: true, // 개발 서버 실행 시 브라우저 바로 열기
    historyApiFallback: true, // 미리 정의되지 않은 경로 참조 시 404 응답 대신 index.html 페이지를 제공하게 하기. true로 안하면 404 페이지 커스텀 불가
  },
```

dev-server는 번들을 디스크(./dist)에 쓰지 않고, 메모리에서 서빙한다. 가상의 bundle.js 는 webpack.config.js 의 `output.publicPath` (기본 /) 에 위치한다. 그래서 현재 index.html에서 참조하는 스크립트 파일의 경로를 /로 수정해줘야 한다.

- index.html

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>웹팩쉽다</title>
  </head>
  <body>
    <div id="root"></div>
    <!-- type="module" 제거하고 in memory bundle을 참조하게 경로 변경 -->
    <script src="./bundle.js"></script>
  </body>
</html>
```

그리고 package.json 에서 개발 서버를 띄울 명령어를 추가한다

```json
// ...
  "scripts": {
    // dev server를 띄우기 위해서는 webpack 뒤에 serve, server, s 키워드를 추가하거나,
    // webpack-dev-server를 직접 호출한다
    "dev": "webpack serve --config ./webpack.config.js",
    "build": "webpack --config ./webpack.config.js",
    // ...
  }
  // ...
```

개발 서버 실행에 성공했다. 그런데, dev server 실행과 production build에 따라 index.html을 수정해야하는 것은 매우 번거롭다. 이를 해결하기 HTML Webpack 플러그인을 사용한다.

### HTML Webpack 플러그인

HTML Webpack 플러그인은 생성되는 번들파일을 참조하는 html 파일을 자동으로 생성해준다. 이를 활용하면 아래처럼 bundle 파일의 이름 및 경로를 index.html에서 직접 수정해줄 필요가 없다. 또한 bundle 파일명에 hash가 추가되는 경우 이에 맞춰 따라가기에도 편리하다.

- dev 환경의 경우: `./public/index.html`이 `./bundle.js`를 사용하면 된다
  - 메모리에 있는 가상의 bundle 참조
- prod 환경의 경우: `./public/index.html`이 `../dist/bundle.js`를 사용하면 된다
  - 이미 만들어져 있는 html이 만들어진 bundle을 참조

플러그인 설치

```bash
pnpm add -D html-webpack-plugin
```

이제 webpack config에 HTML Webpack 플러그인을 추가해준다

- webpack.config.js

```js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // ...
  // public/index.html을 본따서 html 생성
  plugins: [new HtmlWebpackPlugin({ template: "public/index.html" })],
};
```

그리고, public/index.html 에서는 script tag를 제거한다. HTML Webpack 플러그인이 자동으로 스크립트를 추가해주기 때문이다.

그리고 빌드하면 ./dist 내부에 bundle.js를 참조하는 index.html이 생성된다. 개발 서버도 정상적으로 실행된다.

### webpack config 분리

dev server 관련 webpack config는 prod 환경에서는 불필요한 옵션이다. 또한 소스맵을 dev 환경에서만 활성화해서 디버깅에 도움을 얻을 수 있다. 각 환경에 맞는 webpack config를 가져가면서 유연하게 적용해본다.

root 경로에서 본 Webpack 분할 구조

- webpack 폴더를 만들고 내부에 실제 config 파일들을 배치한다

```bash
src/
# ...
webpack/
  path.js             # 경로 상수
  webpack.common.js   # 공통 설정
  webpack.dev.js      # development 전용 설정
  webpack.prod.js     # production 전용 설정
# ...
```

먼저, package.json 에서 명령어를 수정해준다

- mode 옵션을 명령어에 명시해서 파일에 명시할 필요 없음(cli가 config 파일보다 우선순위 높음)
- mode 옵션에 따라 webpack 내장 기능이 적용되고, 환경 변수도 주입된다
- package.json

```json
// ...
  "scripts": {
    "dev": "webpack serve --config ./webpack/webpack.dev.js --mode development",
    "build": "webpack --config ./webpack/webpack.prod.js --mode production",
    // ...
  }
```

경로 상수를 생성한다

- ./webpack/path.js

```js
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

module.exports = {
  ROOT,
  SRC: path.join(ROOT, "src"),
  DIST: path.join(ROOT, "dist"),
  PUBLIC: path.join(ROOT, "public"),
};
```

webpack 공통 설정을 생성한다

- 설정파일이 ./webpack/에 있어도 기준을 프로젝트 루트 경로로 고정하여 경로 관련 이슈 발생 방지
  - 또한, swc loader가 root 경로의 .swcrc를 이해할 수 있게 해줌
- ./webpack/webpack.common.js

```js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ROOT, SRC, DIST, PUBLIC } = require("./path");

module.exports = {
  context: ROOT, // 설정파일이 ./webpack/에 있어도 기준을 프로젝트 루트 경로로 고정
  entry: path.join(SRC, "index.ts"),
  output: {
    path: DIST,
    filename: "bundle.js",
    clean: true,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(PUBLIC, "index.html"),
    }),
  ],
};
```

webpack dev 설정파일을 생성한다.

- 먼저 webpack config 분할과 통합을 위해 webpack-merge 라이브러리를 설치한다

```bash
pnpm add -D webpack-merge
```

- common 파일을 require 하여 merge한다
- 디버깅용 소스맵 추가하고, 브라우저 개발자 도구에서 소스 코드 구조 그대로 표시되게 함
  - devtoolModuleFilenameTemplate
  - devtoolNamespace: 프로젝트 이름 표시
- ./webpack/webpack.dev.js

```js
const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const { PUBLIC } = require("./path");

module.exports = merge(common, {
  devtool: "eval-cheap-module-source-map",
  output: {
    devtoolModuleFilenameTemplate: "webpack://[namespace]/[resource-path]",
    devtoolNamespace: "webpack-age",
  },
  devServer: {
    static: { directory: PUBLIC },
    port: 12345,
    open: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: "swc-loader",
        },
      },
    ],
  },
});
```

prod 환경 webpack 설정 파일 추가

- ./webpack/webpack.prod.js

```js
const { merge } = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common, {
  devtool: "nosources-source-map", // 맵 배포 + 소스 미포함
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: "swc-loader",
        },
      },
    ],
  },
});
```

이제 개발 서버 실행 시 소스맵도 볼 수 있다
