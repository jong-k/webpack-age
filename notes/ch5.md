# ch5. CSS, 정적 파일(폰트, 아이콘, 이미지)를 번들에 포함하기

## 목표

- CSS 파일 번들에 추가하기
- 폰트 파일 번들에 추가하기
- 아이콘 파일 번들에 추가하기
- 이미지 파일 번들에 추가하기

## 상세

Webpack이 번들에 css를 포함하게 하기 위해 css loader를 사용해야 한다. 만약, 사용하지 않는다면, dist/index.html에 직접 수동으로 style sheet를 추가해야하는 불편함이 있다.

### CSS Loader 추가하기

간단한 css 파일을 생성한다

- src/index.css

```css
* {
  background: black;
  color: white;
}
```

이 css 파일을 엔트리 파일인 main.tsx 에서 import 해준다.

- TSC가 기본적으로 .ts 가 아닌 css 파일을 모듈로 인식하지 못하기 때문에, .d.ts 파일에서 선언을 해줘야 한다

src/global.d.ts 를 생성하고 선언을 추가하여 TSC가 .css 확장자를 모듈로 인식하게 한다

- src/global.d.ts

```ts
declare module "*.css";
```

그리고 css를 번들에 포함하기 위해 css-loader 및 style-loader 라이브러리를 설치한다

```bash
# css-loader: CSS 문법를 해석(@import, url() 등등)
# style-loader: DOM에 스타일 주입
pnpm add -D css-loader style-loader
```

webpack config에 loader를 추가한다.

- loader는 오른쪽부터 왼쪽으로, 아래서부터 위로 적용된다.
- 먼저, 오른쪽 -> 왼쪽 순으로 css 문법을 다루는 css loader를 추가하고, 스타일을 주입하는 style loader를 추가해주면 된다.

- webpack.common.js

```js
// ...
module.exports = {
  // ...
  module: {
    // 순서 주의
    rules: [{ test: /\.css$/, use: ["style-loader", "css-loader"] }],
  },
  // ...
};
```

### Tailwind CSS 사용할 수 있게 설정하기

이제 일반적인 CSS를 사용할 수 있게 됐다. 여기서 조금 더 나아가서 Tailwind CSS를 사용할 수 있게 해본다. tailwind는 postcss 플러그인으로 설치할 수 있고, postcss 플러그인이 tailwind 관련 문법을 전처리해서 css로 변환해준다.

그리고 Webpack에서 postcss loader를 설정하면 tailwind를 정상적으로 사용할 수 있다.

- tailwind 패키지 설치

```bash
pnpm add tailwindcss @tailwindcss/postcss postcss
```

- postcss.config.mjs 생성 (tailwind 공식 문서 참조)
- global.css 에서 tailwind import 추가

여기까지만 진행해도 tailwind 세팅이 앱에 적용되서 스타일 초기화가 적용되어 user agent 스타일이 지워진다. 그러나 webpack config에 post css loader를 추가하지 않았기 때문에, 아직 tailwind 유틸리티 클래스를 사용할 수는 없다.

post css loader 설치

```bash
pnpm add -D postcss-loader
```

이제, css loader 설정에 post css loader를 추가한다

- webpack.common.js

```js
// ...

module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", { loader: "css-loader", options: { importLoaders: 1 } }, "postcss-loader"],
      },
    ],
  },
  // ...
};
```

이제 tailwind를 정상적으로 사용할 수 있다

### 빌드 시 CSS를 별도 파일로 추출하기(MiniCssExtractPlugin)

지금은 style-loader가 css를 style 태그를 활용해서 index.html에 주입하지만, 빌드 시 css를 별도 파일로 추출할 수도 있다. css를 별도 파일로 분리하면 아래와 같은 장점이 있다.

- 캐싱 최적화
  - CSS만 바뀐다면, .css 파일만 업데이트하면 된다(전체 .js 파일 업데이트할 필요 없어짐)
- 병렬 로딩 및 초기 성능
  - js 다운로드 및 파싱을 기다리지 않고 먼저 실행된다 (HTML -> CSS -> JS)

MiniCssExtractPlugin

- 이 플러그인은 css 파일을 별도로 분리하게 해준다
- 설치

```bash
pnpm add -D mini-css-extract-plugin
```

css 추출 플러그인은 Prod 환경에서만 사용한다. 개발 환경에서는 굳이 css 파일을 별도로 분리하여 빌드 시간을 증가시킬 필요가 없다. webpack.common.js에 작성한 css loader를 아래처럼 분리한다.

- dev: style-loader 사용
- prod: mini-css-extract-plugin 사용

분리 결과

- webpack.common.js: css 관련 모듈 제거

```js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ROOT, SRC, DIST, PUBLIC } = require("./path");

module.exports = {
  context: ROOT, // 설정파일이 ./webpack/에 있어도 기준을 프로젝트 루트 경로로 고정
  entry: path.join(SRC, "main.tsx"),
  output: {
    path: DIST,
    filename: "assets/[name].js", // assets 폴더에 js 파일 생성
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

- webpack.dev.js: style loader 사용

```js
// ...

module.exports = merge(common, {
  // ...
  module: {
    rules: [
      // ...
      {
        test: /\.css$/,
        use: ["style-loader", { loader: "css-loader", options: { importLoaders: 1 } }, "postcss-loader"],
      },
    ],
  },
});
```

- webpack.prod.js: MiniCssExtractPlugin tkdyd

```js
// ...
module.exports = merge(common, {
  // ...
  plugins: [
    new MiniCssExtractPlugin({
      filename: "assets/[name].css", // assets 폴더에 css 파일 생성
    }),
  ],
  module: {
    rules: [
      // ...
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, { loader: "css-loader", options: { importLoaders: 1 } }, "postcss-loader"],
      },
    ],
  },
});
```

### 폰트 파일 추가하기

이제 폰트 파일을 앱에 추가해본다. pretendard .woff2 폰트파일을 public/fonts 에 추가하고, webpack config에서 .woff2 파일을 index.html에 포함하게 한다.

폰트의 경우, 용량이 매우 크기 때문에, 애셋 모듈을 `asset/resource`로 설정한다

- 애셋 모듈을 `asset/resource`로 설정하면 별도의 파일로 내보낼 수 있다
- 만약 별도의 파일로 내보내지 않고 .js 파일에 포함한다면 base64 인코딩을 해서 raw file 보다 용량이 늘어날 것이다.
- 용량이 작은 svg, ico 파일의 경우, 네트워크 요청을 줄이기 위해 base64 인코딩으로 .js 번들에 포함시키는게 좋을 수 있다 (폰트의 경우에는 용량이 너무 늘어남)

- webpack.common.js

```js
// ...
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.(woff2?|ttf|otf|eot)$/i,
        type: "asset/resource", // 별도의 파일로 내보내기
        generator: { filename: "assets/fonts/[name][ext]" }, // 이름, 확장자는 자동으로 생성됨
      },
    ],
  },
  // ...
};
```

그리고 src/index.css에서 폰트를 추가한다

- src/index.css

```css
@import "tailwindcss";

@font-face {
  font-family: "Pretendard Variable";
  font-weight: 45 920;
  font-style: normal;
  font-display: swap;
  src: url("/public/fonts/PretendardVariable.woff2") format("woff2-variations");
}

html {
  font-family:
    "Pretendard Variable",
    Pretendard,
    -apple-system,
    system-ui,
    "Segoe UI",
    Roboto,
    "Helvetica Neue",
    "Noto Sans KR",
    "Apple SD Gothic Neo",
    "Malgun Gothic",
    Arial,
    "Apple Color Emoji",
    "Segoe UI Emoji",
    "Segoe UI Symbol",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

이제 Pretendard 폰트가 정상적으로 앱 전역에 적용된다

- 육안으로 바로 확인하려면, 화면의 ㅎ 글자의 윗 받침이 수직이면 Pretendard가 정상 적용된 것이다 (기본 폰트는 윗 받침이 수평임)

### 번들에 favicon 추가하기

favicon을 사용하기 위해서는 2가지 방법이 있다.

1. (수동으로 추가) public/index.html 파일에 직접 icon link 태그를 추가하기
2. (Webpack 플러그인 활용) html 플러그인을 활용하여 동적으로 아이콘 추가하기

Webpack 플러그인을 활용하여 동적으로 아이콘을 추가해본다

- 디바이스별 세부적인 아이콘 세팅을 위해서는 `Favicons Webpack Plugin` 플러그인을 사용하면 된다
  - apple-touch-icon 등등
- 간단히 `<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">` 정도만 추가하려면, 기존 HTML Webpack 플러그인으로도 해결이 가능하다.

먼저 icon 파일을 준비하고 public/images 폴더에 넣는다.

- HTML Webpack 플러그인을 활용하기 때문에 별도의 module.rules가 필요하지 않다.
- webpack.common.js

```js
// ...

module.exports = {
  // ...
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(PUBLIC, "index.html"),
      favicon: path.join(PUBLIC, "images/favicon-32x32.png"),
    }),
  ],
};
```

### 번들에 이미지 추가하기

- image를 사용하기 위해 webpack에 module rules를 추가한다
- font와 마찬가지로 직접 모듈에 추가하기 위해 module asset type을 asset/resource 로 설정
- webpack.common.js

```js
// ...

module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.(woff2?|ttf|otf|eot)$/i,
        type: "asset/resource",
        generator: { filename: "assets/fonts/[name][ext]" },
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        type: "asset/resource",
        generator: { filename: "assets/images/[name][ext]" },
      },
    ],
  },
  // ...
};
```
