# ch2. TypeScript 프로젝트 번들링하기 (SWC 사용)

## 목표

- TypeScript 소스 코드를 Webpack으로 번들링하기

## 상세

### TypeScript 설치

```bash
pnpm add -D typescript
# tsconfig 생성
npx tsc init
```

소스코드의 .js 파일을 .ts 파일로 전환

- TypeScript 에서 ESM import, export 지원을 위해 tsconfig 수정 필요
  - `module: "nodenext"` -> `"esnext"`
- tsconfig.json

```json
{
  // Visit https://aka.ms/tsconfig to read more about this file
  "compilerOptions": {
    // "module": "nodenext",
    "module": "esnext",
    "target": "esnext",
    "types": [],
    "sourceMap": true,
    "declaration": true,
    "declarationMap": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "strict": true,
    "jsx": "react-jsx",
    "verbatimModuleSyntax": true,
    "isolatedModules": true,
    "noUncheckedSideEffectImports": true,
    "moduleDetection": "force",
    "skipLibCheck": true
  },
  "include": ["src"],
  "exclude": ["**/*.test.*", "**/*.spec.*", "**/*.stories.*"]
}
```

- `.ts` import 시 확장자를 사용하려면 tsconfig 에서 `"allowImportingTsExtensions": true` 추가 필요

이제 ts로 변환을 실행하고, ts 산출물들을 번들링해본다.

### Webpack에서 TypeScript 처리도 수행하게 하기

지금처럼 tsc 명령어로 직접 트랜스파일링 후 webpack 명령어로 번들링 하는 과정은 조금 번거롭다. Webpack의 Loader로 TypeScript 트랜스파일러를 추가하여 Webpack이 .ts 파일을 .js 파일로 변환하고, 이를 번들링하게 해본다.

TypeScript 트랜스파일러 비교

- SWC: Rust로 작성되어 트랜스파일링 속도 매우 빠름
  - Next.js에서 기본 채택
- Babel: 사용된지 오래되어 안정성 우수하고 생태계 풍부

SWC를 사용하여 Webpack을 구성해본다

- SWC 패키지와 로더 설치

```bash
# SWC 코어, webpack에서 사용할 loader
pnpm add -D @swc/core swc-loader
```

SWC 설정파일 `.swcrc` 생성

- 설정 파일 없이 트랜스파일링도 가능하지만, .swcrc 를 생성하여 트랜스파일링 옵션을 지정한다
- .swcrc

```json
{
  "jsc": {
    "target": "es2020",
    "parser": { "syntax": "typescript", "tsx": true }
  },
  "sourceMaps": false
}
```

webpack.config.js 에서 swc loader 추가

- webpack.config.js

```js
const path = require("path");

module.exports = {
  mode: "development",
  // ts를 그대로 사용하므로 엔트리 파일의 .ts 명시
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true,
  },
  // SWC loader 추가
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /(node_modules)/,
        use: "swc-loader",
      },
    ],
  },
};
```

그리고 빌드를 실행해서 bundle.js가 정상적으로 생성되는 것을 확인한다

- can't resolve ./console(import 되는 모듈) 에러 발생 시 webpack.config.js 에서 resolve 옵션을 확인한다
  - entry 옵션에는 index.ts 를 명시해서 트랜스파일링 대상에 포함되나, resolve.extensions 설정에는 .ts 확장자가 없어서 에러가 발생
- resolve.extensions 기본값은 [".js", ".json", ".wasm"] 이므로, TypeScript 확장자를 추가한다
- webpack.config.js

```js
// ...
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  //...
```
