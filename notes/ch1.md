# ch1. 기초적인 Webpack 세팅 후 간단한 JavaScript 스크립트 빌드해보기

## 목표

- Webpack 기본 옵션 세팅
- HTML, JavaScript 파일 만들고 빌드해보기

## 상세

### 프로젝트 구성

완전 빈 프로젝트에서 시작해서 프로젝트를 구성한다

- package.json 생성

```bash
pnpm init
```

- .gitignore 만들기
- index.html 만들기
  - public/index.html

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>웹팩쉽다</title>
  </head>
  <body></body>
</html>
```

아주 기초적인 JavaScript 파일을 만들고 `index.html`에 스크립트로 추가한다.

- src/index.js

```js
window.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");
  if (!root) return;

  const h2 = document.createElement("h2");
  h2.textContent = "created by index.js";
  h2.style.fontStyle = "italic";

  root.appendChild(h2);
});
```

이 스크립트를 index.html 에 추가하고 VS Code의 Live Server 익스텐션을 띄워서 제대로 동작하는지 확인한다

- public/index.html

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
    <!-- 스크립트 추가 -->
    <script src="../src/index.js"></script>
  </body>
</html>
```

이번에는 index.js 에서 다른 모듈을 import 해본다

- src/console.js

```js
export const consoleText = text => console.log(text);
```

- src/index.js

```js
import { consoleText } from "./console.js";

window.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");
  if (!root) return;

  const h2 = document.createElement("h2");
  h2.textContent = "created by index.js";
  h2.style.fontStyle = "italic";

  root.appendChild(h2);
  consoleText("import한 모듈 호출해서 콘솔 찍어보기");
});
```

모듈을 import, export했기 때문에, `index.html` 에서 이 스크립트를 module이라고 지정해줘야 한다

- public/index.html

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
    <!-- type="module" 추가 -->
    <script type="module" src="../src/index.js"></script>
  </body>
</html>
```

### Webpack 설치 및 번들링

이제 js 파일을 번들링해보기 위해 webpack 패키지들을 설치한다

```bash
# webpack core, cli 도구
pnpm add -D webpack webpack-cli
```

webpack config를 생성한다

- webpack.config.js

```js
const path = require("path");

module.exports = {
  // webpack 내장 기능 적용을 결정
  // development: 코드 압축 적게, 빌드 속도 빠름 등
  // production: (기본값) 코드 압축 크게, 빌드 속도 느림, 기타 플러그인 작동 등
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true, // 빌드 전 output 폴더를 비움
  },
};
```

src/index.js 대신 dist/bundle.js 를 스크립트 모듈로 사용한다

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
    <!-- 스크립트 경로 변경 -->
    <script type="module" src="../dist/bundle.js"></script>
  </body>
</html>
```

이제 번들링을 위해 package.json 에서 스크립트 명령어를 추가한다

- 명령어에 다양한 옵션을 추가할 수 있다

```js
// ...
"scripts": {
  // config 파일 경로의 구성을 사용하여 빌드
  "build": "webpack --config ./webpack.config.js",
  // ...
}
```

빌드 실행

```bash
pnpm build
```

실행 결과

- dist/bundle.js 에 번들링 파일이 생성됨(내부에 eval로 각 모듈을 실행 -> 소스맵 꺼져 있음)

소스맵

- 일반적으로 production 환경에서는 일반 사용자가 소스맵 파일에 접근할 수 없도록 해야 한다
  - webpack.config.js의 devtool 옵션을 생략하거나 false로 해둔다
- development 환경에서 소스맵을 사용하고 싶다면 devtool="source-map" 을 설정한다
- 각 설정별 번들 파일 비교: https://github.com/webpack/webpack/tree/main/examples/source-map
