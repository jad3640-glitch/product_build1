# 끝말잇기 & 동물상 테스트 Blueprint

## Overview

이 프로젝트는 한국어 끝말잇기 게임, Teachable Machine을 활용한 동물상 테스트(강아지/고양이), 그리고 제휴 문의 기능을 제공하는 통합 웹 애플리케이션입니다.

## Design and Features

### Visual Design
- **Aesthetics**: 현대적이고 깔끔한 UI, 카드형 레이아웃, 다층 그림자 효과.
- **Theme**: 라이트/다크 모드 지원 (시스템 설정 감지 및 사용자 토글).
- **Interactive**: 버튼 호버 효과, 입력창 글로우 효과, 결과 애니메이션.
- **Typography**: Noto Sans KR.

### Features
1.  **동물상 테스트 (New)**: 
    - Teachable Machine 모델(`ah5XrmvRKk`) 연동.
    - 웹캠 실시간 분석 및 로컬 이미지 업로드 분석 지원.
    - 분석 결과(강아지상/고양이상) 및 확률 그래프 표시.
2.  **끝말잇기 게임**: 
    - 두 글자 이상의 단어 입력, 중복 체크, 규칙 검증.
    - 참여 기록 실시간 리스팅.
3.  **제휴 문의 폼**: Formspree 연동을 통한 이메일 전송.
4.  **댓글 시스템**: Disqus 연동 커뮤니티.

## Implementation Plan

### `index.html`
- Teachable Machine SDK(TF.js, Image) 추가.
- `animal-test-container` 섹션 추가 (웹캠 영역, 업로드 영역, 결과창).
- 기존 게임 및 폼 구조 유지.

### `style.css`
- 웹캠 및 업로드 박스(`upload-area`)의 시각적 디자인.
- 결과 확률을 시각화하는 프로그레스 바 스타일링.
- 전반적인 카드 디자인 고도화 (Shadow & Border).

### `main.js`
- `tmImage` 모델 로드 및 웹캠/이미지 처리 로직.
- AI 예측 함수 (`predict`) 및 UI 업데이트 로직 통합.
