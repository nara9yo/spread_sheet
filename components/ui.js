// ==============================
// ui.js: DOM 생성, 렌더링, 셀 이벤트 처리
// ==============================

import { spreadsheet, Cell } from "./spreadsheet.js";

// ==============================
// 선택된 셀 상태를 추적 (스크롤/리렌더링 후에도 하이라이트 유지)
// ==============================
let selectedCellPos = null; // { row, col } 형태로 저장

// ==============================
// 셀 DOM 생성 함수
// ==============================
export function createCellEl(
  cell,
  handleCellInput,
  handleCellClick,
  handleOnChange
) {
  let cellEl;
  if (cell.isHeader) {
    // 헤더 셀은 div로 생성
    cellEl = document.createElement("div");
    cellEl.className = "cell header";
    cellEl.textContent = cell.data;
  } else {
    // 일반 셀은 input으로 생성
    cellEl = document.createElement("input");
    cellEl.className = "cell";
    cellEl.value = cell.data;
    cellEl.disabled = cell.disabled;
    cellEl.addEventListener("input", (e) =>
      handleCellInput(e, cell.row, cell.column)
    );
    cellEl.onchange = (e) => handleOnChange(e.target.value, cell);
  }
  cellEl.id = "cell_" + cell.row + "_" + cell.column;
  cellEl.onclick = () => handleCellClick(cell);
  // 선택된 셀 하이라이트 복원
  if (
    selectedCellPos &&
    cell.row === selectedCellPos.row &&
    cell.column === selectedCellPos.col
  ) {
    cellEl.classList.add("selected");
    // 헤더 하이라이트도 복원
    setTimeout(() => {
      highlightHeaders(cell);
    }, 0);
  }
  return cellEl;
}

// ==============================
// 시트 전체 렌더링
// ==============================
export function drawSheet(
  sheetArea,
  createCellEl,
  handleCellInput,
  handleCellClick,
  handleOnChange
) {
  sheetArea.innerHTML = "";
  for (let i = 0; i < spreadsheet.length; i++) {
    const rowContainerEl = document.createElement("div");
    rowContainerEl.className = "cell-row";
    for (let j = 0; j < spreadsheet[i].length; j++) {
      const cell = spreadsheet[i][j];
      rowContainerEl.append(
        createCellEl(cell, handleCellInput, handleCellClick, handleOnChange)
      );
    }
    sheetArea.append(rowContainerEl);
  }
}

// ==============================
// 셀 입력/선택 이벤트 처리
// ==============================
export function handleCellInput(e, r, c, addRow, addCol, drawSheet) {
  spreadsheet[r][c].data = e.target.value;
  // 마지막 행/열에서 입력 시 자동 확장
  if (r === spreadsheet.length - 1) addRow(drawSheet);
  if (c === spreadsheet[0].length - 1) addCol(drawSheet);
}

export function handleOnChange(data, cell) {
  cell.data = data;
}

export function handleCellClick(
  cell,
  spreadsheet,
  getElFromRowCol,
  clearHeaderActiveStates,
  clearSelectedCellStates
) {
  // 선택된 셀 위치 저장
  selectedCellPos = { row: cell.row, col: cell.column };
  // 1. 모든 활성화 및 선택 상태를 초기화
  clearHeaderActiveStates();
  clearSelectedCellStates();
  // 2. 클릭된 셀의 DOM 요소를 가져와 선택 표시
  const cellEl = getElFromRowCol(cell.row, cell.column);
  cellEl.classList.add("selected");
  cellEl.focus();
  // 3. 해당 셀의 행/열 헤더를 활성화
  const columnHeader = spreadsheet[0][cell.column];
  const rowHeader = spreadsheet[cell.row][0];
  const columnHeaderEl = getElFromRowCol(columnHeader.row, columnHeader.column);
  const rowHeaderEl = getElFromRowCol(rowHeader.row, rowHeader.column);
  columnHeaderEl.classList.add("active");
  rowHeaderEl.classList.add("active");
  // 4. 셀 상태 정보 표시
  document.querySelector("#cell-status").innerHTML =
    cell.columnName + cell.rowName;
}

// 헤더 하이라이트 복원 함수
function highlightHeaders(cell) {
  const columnHeader = spreadsheet[0][cell.column];
  const rowHeader = spreadsheet[cell.row][0];
  const columnHeaderEl = getElFromRowCol(columnHeader.row, columnHeader.column);
  const rowHeaderEl = getElFromRowCol(rowHeader.row, rowHeader.column);
  if (columnHeaderEl) columnHeaderEl.classList.add("active");
  if (rowHeaderEl) rowHeaderEl.classList.add("active");
}

// ==============================
// 상태 초기화 유틸리티
// ==============================
export function clearHeaderActiveStates() {
  document.querySelectorAll(".header").forEach((header) => {
    header.classList.remove("active");
  });
}

export function clearSelectedCellStates() {
  const selectedCells = document.querySelectorAll(".selected");
  selectedCells.forEach((cell) => {
    cell.classList.remove("selected");
  });
}

// ==============================
// 셀 DOM 요소 조회 유틸리티
// ==============================
export function getElFromRowCol(row, col) {
  return document.querySelector("#cell_" + row + "_" + col);
}

// 선택된 셀 위치를 외부에서 접근할 수 있도록 export (필요시)
export function getSelectedCellPos() {
  return selectedCellPos;
}
