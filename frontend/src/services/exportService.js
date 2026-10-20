/**
 * Client-Side Data Export Utility (CSV and JSON)
 */

/**
 * Escapes a cell value for CSV formatting
 */
const escapeCSV = (value) => {
  if (value === null || value === undefined) return '""';
  const stringValue = String(value).replace(/"/g, '""');
  return `"${stringValue}"`;
};

/**
 * Download a blob as a file in the user's browser
 */
const triggerDownload = (blob, filename) => {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
};

/**
 * Exports an array of objects to CSV file
 *
 * @param {Array<Object>} rows - Array of tabular records
 * @param {string} filename - Filename with .csv extension
 */
export const exportToCSV = (rows, filename = "export.csv") => {
  if (!rows || rows.length === 0) {
    console.warn("No data provided to exportToCSV");
    return;
  }

  const headers = Object.keys(rows[0]);
  const headerLine = headers.map(escapeCSV).join(",");

  const lines = rows.map((row) =>
    headers.map((field) => escapeCSV(row[field])).join(",")
  );

  const csvContent = [headerLine, ...lines].join("\r\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  triggerDownload(blob, filename.endsWith(".csv") ? filename : `${filename}.csv`);
};

/**
 * Exports data to formatted JSON file
 *
 * @param {any} data - Any serializable object or array
 * @param {string} filename - Filename with .json extension
 */
export const exportToJSON = (data, filename = "export.json") => {
  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: "application/json;charset=utf-8;" });
  triggerDownload(blob, filename.endsWith(".json") ? filename : `${filename}.json`);
};
