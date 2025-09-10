# ch3. Webpack으로 dev server 띄우기

## 목표

- dev server 띄우기

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

개발 서버 실행 성공했다. 그런데, dev server 와 production build 목적에 따라 index.html을 직접 변경하는 것은 매우 번거롭다. 이를 해결하기 위해 development 전용 webpack 설정과 production 전용 webpack 설정을 분리한다
