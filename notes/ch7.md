# ch7. 번들 최적화 및 번들 서빙 기능(preview) 추가

## 목표

- 무거운 의존성을 개발 환경에서만 사용하기
- 간단한 서버 만들어 번들 파일 서빙하기(preview)
- 캐싱을 위한 번들 파일명 해시 추가
- css 압축 플러그인 적용

## 상세

### 무거운 의존성을 개발환경에서만 사용하기

fakerjs 는 더미 데이터를 만들어 앱을 테스트하는데 쓰이는 라이브러리이다. 하지만 의존성 용량이 다소 큰 편이라, 배포 환경에는 올리지 않는 것이 좋다.

- 개발 환경에서만 사용하기
- 배포 환경에서는 fakerjs 의존성을 배제하고 더미 데이터로 대체하기

우선 fakerjs를 개발 의존성으로 설치하여, 1차적으로는 번들에 포함하지 않게 할 수 있다. 하지만, 개발 의존성이라도, 앱 코드에서 import되면, 번들에 포함된다.

이를 막기 위해, devlopment 환경에서만 import 하게 한다

- src/features/ticket/lib/ticketData.ts

```ts
// ...
// 함수 반환값을 Promise 타입으로 선언
export async function loadTicketData(): Promise<TicketRuntimeData> {
  // 개발환경에서만 동적으로 import
  if (process.env.NODE_ENV !== "production") {
    const { faker } = await import("@faker-js/faker");

    return {
      // ... faker로 만든 더미 데이터
    };
  }
  // 배포 환경에서는 미리 준비한 더미 데이터 반환
  return TICKET_PLACEHOLDER;
}
```

### 번들 파일 서빙 기능 추가

- `pnpm preview` 명령어로 번들 파일을 서빙할 수 있는 기능 추가
- http 모듈로 서버를 만들고, / 경로에 dist/index.html을 서빙
- fs 모듈의 createReadStream 으로 스트림을 만들어 응답에 전달할 수 있음
- / 경로에 요청을 받으면, 브라우저가 참조되는 번들을 차례로 요청
  - .js, .css, fonts 등등
- 번들 파일의 확장자에 따라 서버에서 전달하는 "Content-Type"을 잘 매핑해야 함
  - .html: "text/html; charset=utf-8"
  - .js: "application/javascript; charset=utf-8"

### 캐싱을 위한 번들 파일명 해시 추가

- 번들 파일명에 contenthash를 추가하여 파일 내용이 변할 때만 해시가 바뀌게 되고, 브라우저가 장기적으로 캐싱하는데 유리함

### CSS 압축 플러그인 추가

- css-minimizer-webpack-plugin 플러그인을 통해 CSS 압축 가능

패키지 설치

```bash
pnpm add -D css-minimizer-webpack-plugin
```

webpack.prod.js 파일에 추가

```js
const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const common = require("./webpack.common");

module.exports = merge(common, {
  // ...
  optimization: {
    // ...
    minimizer: ["...", new CssMinimizerPlugin()],
  },

  // ...
});
```
