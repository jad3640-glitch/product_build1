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
    - 접속 시 첫 화면에 표시.
    - 단어 입력, 규칙 검증, 참여 기록 관리.
2.  **동물상 테스트 (Separate View)**: 
    - **사진 업로드 전용** (웹캠 제거).
    - Teachable Machine AI 모델을 통한 강아지/고양이상 분석.
    - 확률 그래프 시각화.
3.  **제휴 문의 폼**: 하단 토글 메뉴로 제공.
4.  **댓글 시스템**: Disqus 연동.

## Implementation Plan

### `index.html`
- `<nav>` 메뉴 추가 (Home/Animal Test).
- `section#game-view`, `section#animal-view`로 영역 분리.
- 동물상 테스트에서 웹캠 버튼 및 캔버스 제거.

### `style.css`
- 네비게이션 바 및 활성 메뉴 스타일링.
- 섹션 전환 시 부드러운 페이드 인 효과.

### `main.js`
- 메뉴 클릭 시 `hidden` 클래스를 제어하여 화면 전환.
- 웹캠 (`tmImage.Webcam`) 관련 코드 전면 삭제.
