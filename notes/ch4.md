# ch4. React 개발환경 직접 세팅하기

## 목표

- React 개발환경을 직접 세팅

## 상세

### React 개발환경 세팅

먼저 필요한 의존성을 설치한다

```bash
# react와 react dom 설치
pnpm add react react-dom
# 필요한 타입을 개발용 의존성으로 설치
pnpm add -D @types/react @types/react-dom
```

그리고 React 컴포넌트를 생성하고 현재 index.js에 작성된 로직을 옮겨 넣는다

- 먼저 App 컴포넌트를 생성한다
- ./src/App.tsx

```tsx
import { useEffect } from "react";
import { consoleText } from "./console";

export default function App() {
  useEffect(() => {
    consoleText("import한 모듈 호출해서 콘솔 찍어보기");
  }, []);

  return (
    <div>
      <h2 style={{ fontStyle: "italic" }}>created by App.tsx</h2>
    </div>
  );
}
```

이 과정에서 jsx 문법을 사용할 때 타입 에러가 날 수 있다.

- tsconfig.json 에서 compilerOptions.moduleResolution 프로퍼티에 "bundler" 를 추가해주면 해결된다.
- 번들러가 모듈을 해석하는 방식대로 TSC가 타입을 해석하게 해준다. TSC가 @types/react-dom 등을 이해할 수 있게 된다.

그리고 엔트리 파일인 main.tsx를 작성한다

```tsx
import { createRoot } from "react-dom/client";
import App from "./App";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

const root = createRoot(rootElement);
root.render(<App />);
```

- 이제 엔트리 파일을 변경해야 하므로, webpack.common.js 에서 entry 프로퍼티를 새로 생성한 main.tsx로 변경한다
- 추가로, swc loader가 react type을 감지하여 트랜스파일링할 수 있도록 .swcrc 파일에 react 관련 옵션을 추가한다

```json
{
  "jsc": {
    "target": "es2020",
    "parser": { "syntax": "typescript", "tsx": true },
    // 옵션 추가
    "transform": { "react": { "runtime": "automatic" } }
  },
  "sourceMaps": true
}
```

그리고 webpack dev, prod 설정에도 옵션을 추가한다

- webpack/webpack.dev.js

```js
// ...
module.exports = merge(common, {
  // ...
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: "swc-loader",
          // 옵션 추가
          options: {
            jsc: {
              transform: {
                // 개발 환경
                react: { development: true },
              },
            },
          },
        },
      },
    ],
  },
});
```

- webpack/webpack.prod.js 에서는 development를 false로 해주면 된다
