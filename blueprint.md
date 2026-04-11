# 끝말잇기 & 동물상 테스트 Blueprint

## Overview

이 프로젝트는 메인 기능인 '끝말잇기 게임'과 부가 기능인 '동물상 테스트'를 제공하는 멀티 뷰 웹 애플리케이션입니다. 상단 메뉴를 통해 기능을 전환할 수 있습니다.

## Design and Features

### Visual Design
- **Navigation**: 상단 고정 네비게이션 및 하단 사이트 맵(Quick Links) 제공.
- **Readability**: 가독성 높은 줄 간격(Line-height) 및 문단 구조 최적화.
- **Visual Hierarchy**: 중요 정보(게임 시작, 분석 결과)를 강조하는 레이아웃.

### Features
1.  **끝말잇기 게임 (Main)**: 
    - 직관적인 사용 가이드 및 실시간 피드백 강화.
2.  **동물상 테스트 (Separate View)**: 
    - 단계별 안내(업로드 -> 분석 -> 결과)를 통한 사용자 경험 개선.
3.  **콘텐츠 허브**: 
    - 각 기능 하단에 관련 지식 및 팁 섹션 배치 (체류 시간 증대).

## Implementation Plan

### `index.html`
- 네비게이션 바 및 푸터에 사이트 전체 링크 추가.
- 각 섹션에 단계별 가이드 문구 삽입.
- 접근성을 고려한 시맨틱 태그 구조화.

### `style.css`
- 텍스트 가독성(폰트 크기, 색상 대비) 정밀 조정.
- 모바일 환경에서의 버튼 크기 및 간격 최적화.
- `section#game-view`, `section#animal-view`로 영역 분리.
- 동물상 테스트에서 웹캠 버튼 및 캔버스 제거.

### `style.css`
- 네비게이션 바 및 활성 메뉴 스타일링.
- 섹션 전환 시 부드러운 페이드 인 효과.

### `main.js`
- 메뉴 클릭 시 `hidden` 클래스를 제어하여 화면 전환.
- 웹캠 (`tmImage.Webcam`) 관련 코드 전면 삭제.
