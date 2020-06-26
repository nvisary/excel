const CHAR_CODES = {
  A: 65,
  Z: 90,
};

const COLUMN_COUNT = CHAR_CODES.Z - CHAR_CODES.A + 1;

export function createTable(rowsCount = 100) {
  const rows = [];

  const columns = new Array(COLUMN_COUNT)
    .fill("")
    .map(toChar)
    .map(toColumn)
    .join("");

  rows.push(createRow(columns));

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(COLUMN_COUNT).fill("").map(toCell).join("");
    rows.push(createRow(cells, i + 1));
  }

  return rows.join("");
}

function toCell(content, _) {
  return createCell(content, true, false);
}

function toChar(_, index) {
  return String.fromCharCode(CHAR_CODES.A + index);
}

function createCell(content = "", editable = true, selected = false) {
  return `
    <div class="cell ${
      selected ? "selected" : ""
    }" contenteditable="${!!editable}">${content}</div>
  `;
}

function toColumn(content) {
  return `
    <div class="column">${content}</div>
  `;
}

function createRow(content, info = "") {
  return `
    <div class="row">
      <div class="row-info">${info}</div>
      <div class="row-data">${content}</div>
    </div> 
  `;
}
