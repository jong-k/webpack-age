# webpack-age

> Webpack Easy!

프로덕션 수준 번들링 학습을 목적으로, Webpack 기반으로 React 애플리케이션을 직접 구성한 프로젝트입니다. 개발, 빌드 파이프라인, 정적 애셋 처리, HMR/React Refresh를 적용해봤습니다.

## 기술 스택

- 언어/런타임: TypeScript, Node.js, pnpm(패키지 매니저)
- UI: React
- 스타일: Tailwind CSS v4
- 번들러: Webpack 5
  - 트랜스파일러: SWC
  - 개발 서버: Webpack Dev Server

## 폴더 구조

- FSD 패턴 적용 (Feature-Sliced Design): `features/`, `entities/`, `shared/`로 역할 분리

```text
├─ public/                 # 정적 템플릿/파비콘
│  ├─ index.html
│  └─ favicons/
├─ src/                    # 애플리케이션 코드
│  ├─ main.tsx             # 엔트리 파일
│  ├─ App.tsx              # 루트 컴포넌트
│  ├─ index.css            # Tailwind CSS 로드, 폰트 적용
│  ├─ assets/
│  │  ├─ fonts/
│  │  └─ images/
│  ├─ features/
│  │  └─ ticket/           # 티켓 생성 도메인
│  │     ├─ TicketContainer.tsx
│  │     ├─ TicketForm.tsx
│  │     ├─ TicketModal.tsx
│  │     ├─ BoardingPass.tsx
│  │     └─ lib/ticketData.ts
│  ├─ entities/
│  │  └─ ticket/model/     # 엔터티 타입과 배럴
│  └─ shared/ui/           # 재사용 UI(Modal 등)
├─ webpack/                # 환경별 번들 설정
│  ├─ webpack.common.js
│  ├─ webpack.dev.js
│  └─ webpack.prod.js
├─ dist/                   # 빌드 산출물 (빌드 시 생성)
└─ 기타 설정               # eslint, prettier, tsconfig, postcss 등
```

## 티켓 생성 서비스 소개

- 출발/도착 날짜를 입력하면 가상의 항공권을 생성합니다.
- 더미 데이터: 개발 환경에서는 `@faker-js/faker`로 항공사/공항/좌석/시간/승객명을 실시간 생성합니다.
  - 프로덕션 환경에서는 미리 선언해둔 문자열 더미 데이터를 사용합니다. (무거운 `@faker-js/faker` 라이브러리를 번들에 포함하지 않기 위해)
- 반응형 디자인 적용

## Webpack 구현 내용

- 엔트리 파일: `src/main.tsx`
  - 이 파일을 기준으로 번들링
- 번들 아웃풋
  - 개발: `assets/[name].js`
  - 프로덕션: `assets/[name].[contenthash].js`
- 로더/플러그인
  - JS/TS: SWC(`swc-loader`)로 트랜스파일링 및 개발 환경에서 React Refresh 활성화
  - CSS
    - 개발: `style-loader + css-loader + postcss-loader (Tailwind CSS 지원)`
    - 프로덕션: `mini-css-extract-plugin`
  - 정적 애셋
    - 폰트/이미지: `asset/resource` 처리
    - 파비콘: /favicons로 바로 접근할 수 있어야 하므로 최적화에서 제외
  - HTML: `HtmlWebpackPlugin`으로 `public/index.html` 템플릿 활용 및 파비콘 주입
- 개발 환경(`webpack.dev.js`)
  - `devtool: eval-cheap-module-source-map` (소스 맵)
  - DevServer: HMR 적용
  - React Refresh: `@pmmmwh/react-refresh-webpack-plugin`
- 프로덕션 환경(`webpack.prod.js`)
  - `devtool: nosources-source-map`(소스 미포함 맵)
  - 최적화: 기본 Terser 유지 + `CssMinimizerPlugin`

## 빠른 시작

사전 준비

- Node.js LTS
- pnpm 10.15.1 (프로젝트의 `packageManager`와 일치)

설치 및 실행

```bash
pnpm i          # 의존성 설치
pnpm dev        # 개발 서버 http://localhost:12345 (HMR + React Refresh)
pnpm build      # 프로덕션 번들(dist)
pnpm preview    # dist 정적 서빙(간단한 미리보기)
```

## 개발 노트

- [기초적인 Webpack 세팅 후 간단한 JavaScript 스크립트 빌드해보기](https://github.com/jong-k/webpack-age/tree/main/notes/ch1.md)
- [TypeScript 프로젝트 번들링하기 (SWC 사용)](https://github.com/jong-k/webpack-age/tree/main/notes/ch2.md)
- [Webpack으로 dev server 띄우고 용도별 분할 및 편의 기능 추가하기](https://github.com/jong-k/webpack-age/tree/main/notes/ch3.md)
- [React 개발환경 직접 세팅하기](https://github.com/jong-k/webpack-age/tree/main/notes/ch4.md)
- [CSS, 정적 파일(폰트, 아이콘, 이미지)를 번들에 포함하기](https://github.com/jong-k/webpack-age/tree/main/notes/ch5.md)
- [HMR(Hot Module Replacement) 적용하기](https://github.com/jong-k/webpack-age/tree/main/notes/ch6.md)
- [번들 최적화 및 번들 서빙 기능(preview) 추가](https://github.com/jong-k/webpack-age/tree/main/notes/ch7.md)

## 기타

package.json 내부의 pnpm.onlyBuiltDependencies 설명

- @swc/core의 자체 스크립트 실행이 보안상의 이유로 pnpm에 의해 막혀있음
- SWC가 제대로 수행되도록 pnpm.onlyBuiltDependencies에서 native binary 다운로드를 허용

## 참고

- [Webpack 공식 문서](https://webpack.js.org/)
