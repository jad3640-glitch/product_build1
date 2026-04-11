# 끝말잇기 & 동물상 테스트 Blueprint

## Overview

이 프로젝트는 메인 기능인 '끝말잇기 게임'과 부가 기능인 '동물상 테스트'를 제공하는 멀티 뷰 웹 애플리케이션입니다. 상단 메뉴를 통해 기능을 전환할 수 있습니다.

## Design and Features

### Visual Design
- **Navigation**: 상단 고정 네비게이션 바를 통해 메뉴 이동.
- **Single Page App (SPA) Style**: 페이지 새로고침 없이 섹션 전환.
- **Theme**: 라이트/다크 모드 지원.
- **Typography**: Noto Sans KR.

### Features
1.  **끝말잇기 게임 (Main)**: 
    - 게임 기능 및 끝말잇기 규칙/팁 등 **풍부한 텍스트 콘텐츠** 포함.
2.  **동물상 테스트 (Separate View)**: 
    - 사진 업로드 분석 및 **AI 모델(Teachable Machine) 원리 설명** 콘텐츠 추가.
3.  **개인정보처리방침 (New)**: 
    - 애드센스 필수 조건인 개인정보처리방침 및 쿠키 정책 섹션 추가.
4.  **제휴 문의 및 제작자 정보**: 사이트의 신뢰성을 높이는 상세 정보 제공.
5.  **수익화**: 구글 애드센스 최적화 배치 및 `ads.txt` 관리.

## Implementation Plan

### `index.html`
- 각 섹션 하단에 정보성 텍스트 블록 추가.
- 하단 푸터(Footer) 및 개인정보처리방침 모달/섹션 추가.
- SEO를 위한 메타 데이터 보강.
- `section#game-view`, `section#animal-view`로 영역 분리.
- 동물상 테스트에서 웹캠 버튼 및 캔버스 제거.

### `style.css`
- 네비게이션 바 및 활성 메뉴 스타일링.
- 섹션 전환 시 부드러운 페이드 인 효과.

### `main.js`
- 메뉴 클릭 시 `hidden` 클래스를 제어하여 화면 전환.
- 웹캠 (`tmImage.Webcam`) 관련 코드 전면 삭제.
