# Nuxt 3 Minimal Starter

Look at the [nuxt 3 documentation](https://v3.nuxtjs.org) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install --shamefully-hoist
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Checkout the [deployment documentation](https://v3.nuxtjs.org/guide/deploy/presets) for more information.

# 필수작업
Index.vue - Intersection Observer 적용 (로딩 페이지 적용 / 로직 적절한 위치로 수정 / 뒤로 가기시 기존 스크롤 위치 저장 구현)/ virtualized list(안보이는 게시글 없앴다 스크롤 올리면 다시 만들기 등) / vue-virtual-scroll-list 보통 사용. 높이 구하는 것 필수.
Infinite Scroll - 서벌 개발 후 데이터 숫자 코드 수정

## 다음작업
로그인 항목 css 마무리 / 로그인 중복 컨텐츠및 불필요 컨텐츠 정리, ref 되도록 제거
화면 크기에 따라 navbar 사이즈 변경(일부 구현 완료) /
프로필 화면 좀 더 꾸미기/ main화면 컨텐츠들 Grid 혹은 flex 이용한 크기 조정
중첩 댓글의 추가/삭제 및 댓글창 디자인

## 완료된 작업
### Components
아이콘 스케일 호버 문제(only safari / will-change)
### Views
Login - ref 되도록 제거