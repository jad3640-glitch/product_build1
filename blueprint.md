# 끝말잇기 게임 & 제휴문의 Blueprint

## Overview

이 프로젝트는 한국어 끝말잇기 게임과 제휴 문의를 위한 웹 애플리케이션입니다. 사용자는 끝말잇기 게임을 즐길 수 있으며, Formspree를 통해 제휴 문의를 보낼 수 있습니다.

## Design and Features

### Visual Design
- **Layout**: 게임과 문의 폼이 포함된 반응형 수직 레이아웃.
- **Color Palette**: 라이트 및 다크 모드를 지원하는 현대적인 컬러 스킴.
- **Theme Persistence**: `localStorage`를 사용한 테마 설정 유지.
- **Typography**: 가독성 높은 Noto Sans KR 폰트.
- **Iconography**: 테마 전환(🌓) 및 직관적인 UI 요소.

### Features
1.  **끝말잇기 게임**: 두 글자 이상의 단어 입력, 중복 체크, 끝말잇기 규칙 검증.
2.  **테마 전환**: 라이트/다크 모드 토글 기능.
3.  **제휴 문의 폼**: Formspree(`https://formspree.io/f/mkopdglk`)를 연동한 이메일 문의 기능.
4.  **댓글 기능**: Disqus(`https://product-build1.disqus.com/embed.js`)를 연동한 사용자 댓글 커뮤니티 기능.
5.  **기록 관리**: 현재 게임의 단어 참여 기록 표시.

## Implementation Plan

### `index.html`
- 게임 컨테이너와 제휴 문의 폼 컨테이너 구성.
- 테마 토글 버튼 및 폼 열기/닫기 버튼 추가.
- Formspree 연동을 위한 `<form>` 태그 구성.

### `style.css`
- CSS 변수를 활용한 테마별 스타일 정의.
- `main-wrapper`를 통한 중앙 정렬 및 간격 조정.
- 폼 요소(`input`, `textarea`, `button`)의 현대적인 스타일링.
- `.hidden` 클래스를 통한 폼 표시 제어.

### `main.js`
- 끝말잇기 게임 로직 (검증, 기록 추가).
- 테마 전환 및 `localStorage` 연동 로직.
- 제휴 문의 폼 토글(열기/닫기) 로직.
