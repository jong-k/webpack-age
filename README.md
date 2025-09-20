# webpack-age

> Webpack Easy!

## 목차

- [기초적인 Webpack 세팅 후 간단한 JavaScript 스크립트 빌드해보기](https://github.com/jong-k/webpack-age/tree/main/notes/ch1.md)
- [TypeScript 프로젝트 번들링하기 (SWC 사용)](https://github.com/jong-k/webpack-age/tree/main/notes/ch2.md)
- [Webpack으로 dev server 띄우고 용도별 분할 및 편의 기능 추가하기](https://github.com/jong-k/webpack-age/tree/main/notes/ch3.md)
- [React 개발환경 직접 세팅하기](https://github.com/jong-k/webpack-age/tree/main/notes/ch4.md)
- [CSS, 정적 파일(폰트, 아이콘, 이미지)를 번들에 포함하기](https://github.com/jong-k/webpack-age/tree/main/notes/ch5.md)
- [HMR(Hot Module Replacement) 적용하기](https://github.com/jong-k/webpack-age/tree/main/notes/ch6.md)
- [번들 최적화 및 번들 서빙 기능(preview) 추가](https://github.com/jong-k/webpack-age/tree/main/notes/ch7.md)

## 기타

package.json 내부의 pnpm.onlyBuiltDependencies 설명

- @swc/core의 자체 스크립트 실행이 보안을 이유로 pnpm에 의해 막혀있음
- SWC가 제대로 수행되도록 pnpm.onlyBuiltDependencies 에서 native binary를 다운로드하게 허가

## 참고

- [Webpack 공식 문서](https://webpack.js.org/)
- [Bundling Fundamentals](https://frontend-fundamentals.com/bundling/)
