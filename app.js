// ==============================
// main.js: 엔트리포인트(초기화, 이벤트 연결)
// ==============================

import {
  spreadsheet,
  initSpreadsheet,
  addRow,
  addCol,
} from "./components/spreadsheet.js";
import {
  drawSheet,
  createCellEl,
  handleCellInput,
  handleCellClick,
  handleOnChange,
  getElFromRowCol,
  clearHeaderActiveStates,
  clearSelectedCellStates,
} from "./components/ui.js";
import { exportToCSV } from "./components/export.js";

const sheetArea = document.querySelector("#sheet-area");
const exportBtn = document.querySelector("#export-btn");

// ==============================
// 시트 초기화 및 렌더링
// ==============================
initSpreadsheet(sheetArea, () =>
  drawSheet(
    sheetArea,
    createCellEl,
    handleCellInputWrapper,
    handleCellClickWrapper,
    handleOnChange
  )
);

// ==============================
// 내보내기 버튼 이벤트 연결
// ==============================
exportBtn.onclick = () => exportToCSV(spreadsheet);

// ==============================
// 셀 입력/클릭 이벤트 래퍼 (의존성 주입)
// ==============================
function handleCellInputWrapper(e, r, c) {
  handleCellInput(
    e,
    r,
    c,
    (drawSheetCb) => addRow(drawSheetCb),
    (drawSheetCb) => addCol(drawSheetCb),
    () =>
      drawSheet(
        sheetArea,
        createCellEl,
        handleCellInputWrapper,
        handleCellClickWrapper,
        handleOnChange
      )
  );
}
function handleCellClickWrapper(cell) {
  handleCellClick(
    cell,
    spreadsheet,
    getElFromRowCol,
    clearHeaderActiveStates,
    clearSelectedCellStates
  );
}

// ==============================
// 스크롤 이벤트(행/열 자동 확장)
// ==============================
sheetArea.addEventListener("scroll", function () {
  if (
    sheetArea.scrollTop + sheetArea.clientHeight >=
    sheetArea.scrollHeight - 2
  ) {
    addRow(() =>
      drawSheet(
        sheetArea,
        createCellEl,
        handleCellInputWrapper,
        handleCellClickWrapper,
        handleOnChange
      )
    );
  }
  if (
    sheetArea.scrollLeft + sheetArea.clientWidth >=
    sheetArea.scrollWidth - 2
  ) {
    addCol(() =>
      drawSheet(
        sheetArea,
        createCellEl,
        handleCellInputWrapper,
        handleCellClickWrapper,
        handleOnChange
      )
    );
  }
});
