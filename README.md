# 자바스크립트로 만드는 동적 스프레드시트(엑셀 스타일)

## 요구사항

- 현재 focus 된 셀의 위쪽 헤더, 왼쪽 헤더가 함께 하늘색으로 하이라이트 됩니다.
- 작성된 모든 데이터는 Export Spreadsheet 버튼을 눌러 Excel(CSV) 파일로 저장할 수 있습니다.
- 생성된 Excel 파일을 구글 Spreadsheet 등에서 Import하면 동일한 데이터가 나옵니다.

---

## 프로젝트 폴더 구조

```
spread_sheet/
├── index.html                  # 메인 HTML 파일 (시맨틱 구조, 메뉴바/시트 영역)
├── README.md                   # 프로젝트 설명 파일
├── .gitignore                  # Git 관리 제외 파일 설정
├── main.js                     # 앱 초기화, 이벤트 바인딩, 전체 로직 제어(엔트리포인트)
├── spreadsheet.js              # 시트 데이터 구조, 행/열 추가, 유틸리티 함수
├── ui.js                       # UI 렌더링, DOM 조작, 셀 이벤트 처리
├── export.js                   # 내보내기(Export) 기능 (CSV 저장)
├── assets/
│   └── favicon.ico             # 파비콘 이미지 등 정적 파일
├── styles/
│   └── style.css               # 전체 스타일(CSS, BEM/변수화)
```

- **main.js**  
  앱의 진입점. 시트 초기화, 이벤트 바인딩, 전체 로직 제어
- **spreadsheet.js**  
  시트 데이터 구조, 행/열 동적 추가, 엑셀 스타일 열명칭 등 유틸리티 함수
- **ui.js**  
  UI 렌더링, DOM 조작, 셀 생성/선택/입력 등 화면 관련 모듈
- **export.js**  
  시트 데이터를 CSV로 내보내는 기능
- **styles/**  
  CSS 등 스타일 파일 (BEM 네이밍, CSS 변수 활용)
- **assets/**  
  이미지, 파비콘 등 정적 파일
- **index.html**  
  앱의 메인 구조와 스크립트/스타일 로딩, 시맨틱 구조 적용

---

## 주요 기능

- 엑셀처럼 동적으로 행/열을 무제한 추가 가능 (스크롤/입력/버튼)
- 현재 선택된 셀의 행/열 헤더가 하이라이트(엑셀 스타일 강조선)
- 헤더(첫 행/첫 열)는 스크롤 시 상단/좌측에 고정(sticky)
- Export Spreadsheet 버튼으로 입력 데이터를 CSV로 저장
- 저장된 CSV 파일을 구글 스프레드시트 등에서 Import 시 동일하게 표시
- 반응형 UI 및 다양한 화면 크기에 대응
- 모듈화(ES6 import/export) 및 BEM/변수 기반 CSS로 유지보수 용이
- 직관적이고 현대적인 UI/UX, 엑셀과 유사한 사용자 경험 제공
