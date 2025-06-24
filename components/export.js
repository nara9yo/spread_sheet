// ==============================
// export.js: 내보내기(Export) 기능
// ==============================

// 시트 데이터를 CSV로 내보내기
export function exportToCSV(spreadsheet) {
  let csv = "";
  for (let i = 1; i < spreadsheet.length; i++) {
    csv +=
      spreadsheet[i]
        .filter((item) => !item.isHeader)
        .map((item) => item.data)
        .join(",") + "\r\n";
  }
  const csvObj = new Blob([csv]);
  const csvUrl = URL.createObjectURL(csvObj);

  // 파일명: spreadsheet_yyyymmdd_hhmmss.csv
  const now = new Date();
  const pad = (n) => n.toString().padStart(2, "0");
  const yyyymmdd =
    now.getFullYear().toString() + pad(now.getMonth() + 1) + pad(now.getDate());
  const hhmmss =
    pad(now.getHours()) + pad(now.getMinutes()) + pad(now.getSeconds());
  const filename = `spreadsheet_${yyyymmdd}_${hhmmss}.csv`;

  // 다운로드 트리거
  const a = document.createElement("a");
  a.href = csvUrl;
  a.download = filename;
  a.click();
}
