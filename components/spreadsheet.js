// ==============================
// spreadsheet.js: 데이터 구조, 시트 생성/확장, 유틸리티
// ==============================

// 셀 데이터 구조 정의
export class Cell {
  constructor(
    isHeader, // 헤더 셀 여부
    disabled, // 입력 비활성화 여부
    data, // 셀 값
    row, // 행 인덱스
    column, // 열 인덱스
    rowName, // 행 이름(번호)
    columnName, // 열 이름(알파벳)
    active = false // 활성화 상태
  ) {
    this.isHeader = isHeader;
    this.disabled = disabled;
    this.data = data;
    this.row = row;
    this.column = column;
    this.rowName = rowName;
    this.columnName = columnName;
    this.active = active;
  }
}

// 시트 데이터 저장 배열 (2차원)
export const spreadsheet = [];

// 엑셀 스타일 열 이름(A, B, ..., Z, AA, AB, ...)
export function getExcelColumnName(n) {
  let name = "";
  while (n > 0) {
    let rem = (n - 1) % 26;
    name = String.fromCharCode(65 + rem) + name;
    n = Math.floor((n - 1) / 26);
  }
  return name;
}

// ==============================
// 시트 초기화: 화면 크기에 맞춰 셀 배열 생성
// ==============================
export function initSpreadsheet(sheetArea, drawSheet) {
  const cellWidth = 80; // .cell width와 반드시 일치!
  const cellHeight = 40; // .cell height와 반드시 일치!
  const containerWidth = sheetArea.clientWidth || window.innerWidth;
  const containerHeight = sheetArea.clientHeight || window.innerHeight - 60;
  const scrollbarWidth = 16;
  // 화면에 보이는 셀 수 계산 (여유분 포함)
  const visibleCols =
    Math.ceil((containerWidth - scrollbarWidth) / cellWidth) + 4;
  const visibleRows = Math.ceil(containerHeight / cellHeight) + 2;

  spreadsheet.length = 0; // 기존 데이터 초기화

  for (let i = 0; i < visibleRows; i++) {
    let spreadsheetRow = [];
    for (let j = 0; j < visibleCols; j++) {
      let cellData = "";
      let isHeader = false;
      let disabled = false;
      // 좌상단(0,0): 빈 헤더
      if (j === 0 && i === 0) {
        cellData = "";
        isHeader = true;
        disabled = true;
      }
      // 첫 행: 열 헤더(알파벳)
      else if (i === 0) {
        cellData = getExcelColumnName(j);
        isHeader = true;
        disabled = true;
      }
      // 첫 열: 행 헤더(숫자)
      else if (j === 0) {
        cellData = i;
        isHeader = true;
        disabled = true;
      }
      const rowName = i;
      const columnName = getExcelColumnName(j);
      const cell = new Cell(
        isHeader,
        disabled,
        cellData,
        i,
        j,
        rowName,
        columnName,
        false
      );
      spreadsheetRow.push(cell);
    }
    spreadsheet.push(spreadsheetRow);
  }
  drawSheet();
}

// ==============================
// 행/열 동적 추가 (자동 확장)
// ==============================
export function addRow(drawSheet) {
  const cols = spreadsheet[0].length;
  const rowIndex = spreadsheet.length;
  const newRow = [];
  for (let c = 0; c < cols; c++) {
    let cellData = "";
    let isHeader = false;
    let disabled = false;
    let rowName = rowIndex;
    let columnName = getExcelColumnName(c);
    // 첫 열: 행 헤더
    if (c === 0) {
      cellData = rowIndex;
      isHeader = true;
      disabled = true;
    }
    const cell = new Cell(
      isHeader,
      disabled,
      cellData,
      rowIndex,
      c,
      rowName,
      columnName,
      false
    );
    newRow.push(cell);
  }
  spreadsheet.push(newRow);
  drawSheet();
}

export function addCol(drawSheet) {
  const rows = spreadsheet.length;
  const colIndex = spreadsheet[0].length;
  for (let r = 0; r < rows; r++) {
    let cellData = "";
    let isHeader = false;
    let disabled = false;
    let rowName = r;
    let columnName = getExcelColumnName(colIndex);
    // 첫 행: 열 헤더
    if (r === 0) {
      cellData = getExcelColumnName(colIndex);
      isHeader = true;
      disabled = true;
    }
    const cell = new Cell(
      isHeader,
      disabled,
      cellData,
      r,
      colIndex,
      rowName,
      columnName,
      false
    );
    spreadsheet[r].push(cell);
  }
  drawSheet();
}
