import { useEffect, useMemo, useState } from "react";
import * as XLSX from "xlsx";

const LEGEND = {
  С: "Сессия (контактная работа)",
  Э: "Экзаменационная сессия",
  Г: "Государственный экзамен",
  Д: "Выполнение и защита ВКР",
  ЗН: "Зачетная неделя",
  Су: "Установочная сессия",
  У: "Учебная практика",
  П: "Производственная практика",
  Н: "Научно-исследовательская работа",
  К: "Каникулы",
  Кп: "Нерабочие праздничные дни",
  "=": "Без занятий",
};

const getCellClass = (val) => {
  if (!val) return "";
  const v = val.toString().trim();
  if (v === "С") return "cell-session";
  if (v === "Э") return "cell-exam";
  if (v === "Г") return "cell-gos";
  if (v === "Д") return "cell-vkr";
  if (v === "ЗН") return "cell-zn";
  if (v === "Су") return "cell-su";
  if (v === "У") return "cell-practice-study";
  if (v === "П") return "cell-practice-prod";
  if (v === "Н") return "cell-nir";
  if (v === "К") return "cell-holiday";
  if (v === "Кп") return "cell-holiday-red";
  if (v === "=") return "cell-equal";
  return "";
};

// Пересчитываем colSpan для строки месяцев на основе реального количества недель
const fixHeaderMerges = (data, mergeMapLocal, skip) => {
  const MONTH_ROW = 0;    // row 14 в файле = первая строка slicedData
  const FIRST_DAY_COL = 3; // col D = index 3 (0-based)

  // Находим все "месячные" ячейки в row 0 (те у которых есть значение и не в skip)
  const monthStarts = [];
  for (let c = FIRST_DAY_COL; c < data[MONTH_ROW].length; c++) {
    const key = `${MONTH_ROW},${c}`;
    if (!skip.has(key) && data[MONTH_ROW][c]) {
      monthStarts.push(c);
    }
  }

  // Для каждого месяца считаем реальный span до следующего месяца
  monthStarts.forEach((startCol, idx) => {
    const endCol =
      idx + 1 < monthStarts.length
        ? monthStarts[idx + 1]
        : data[MONTH_ROW].length;
    const realSpan = endCol - startCol;

    const key = `${MONTH_ROW},${startCol}`;
    const existing = mergeMapLocal.get(key);
    if (existing) {
      mergeMapLocal.set(key, { ...existing, colSpan: realSpan });
      // Помечаем все ячейки внутри нового span как skip
      for (let c = startCol + 1; c < endCol; c++) {
        skip.add(`${MONTH_ROW},${c}`);
      }
    }
  });
};

export default function Timetable() {
  const [tableData, setTableData] = useState([]);
  const [mergeMap, setMergeMap] = useState(new Map());
  const [skipCells, setSkipCells] = useState(new Set());
  const [totalCols, setTotalCols] = useState(0);
  const [originalFileBlob, setOriginalFileBlob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    loadFile();
  }, []);

  const loadFile = async () => {
    try {
      const nameRes = await fetch("/api/excel/current-name");
      if (!nameRes.ok) throw new Error("Файл не найден");
      const filename = await nameRes.text();

      const res = await fetch(`/${encodeURIComponent(filename)}`);
      const buffer = await res.arrayBuffer();

      const blob = new Blob([buffer], { type: "application/vnd.ms-excel" });
      setOriginalFileBlob(blob);

      const wb = XLSX.read(buffer, { type: "array" });
      const sheet = wb.Sheets[wb.SheetNames[0]];

      const rawData = XLSX.utils.sheet_to_json(sheet, {
        header: 1,
        raw: true,
        defval: null,
        blankrows: true,
      });

      const maxCols = Math.max(...rawData.map((r) => r.length));
      const normalized = rawData.map((row) => {
        const r = [...row];
        while (r.length < maxCols) r.push(null);
        return r;
      });

      const START_ROW = 13;
      const END_ROW = 165;
      const slicedData = normalized.slice(START_ROW, END_ROW);

      let lastCourse = "";
      let lastFaculty = "";
      let lastGroup = "";

      const processedData = slicedData.map((row) => {
        const r = [...row];
        if (r[0]) lastCourse = r[0]; else r[0] = lastCourse;
        if (r[1]) lastFaculty = r[1]; else r[1] = lastFaculty;
        if (r[2]) lastGroup = r[2]; else r[2] = lastGroup;
        return r;
      });

      const range = XLSX.utils.decode_range(sheet["!ref"]);
      setTotalCols(range.e.c + 1);

      const merges = sheet["!merges"] || [];
      const mergeMapLocal = new Map();
      const skip = new Set();

      merges.forEach(({ s, e }) => {
        if (s.r < START_ROW || e.r >= END_ROW) return;

        const newRow = s.r - START_ROW;
        const key = `${newRow},${s.c}`;

        mergeMapLocal.set(key, {
          rowSpan: e.r - s.r + 1,
          colSpan: e.c - s.c + 1,
        });

        for (let r = s.r; r <= e.r; r++) {
          for (let c = s.c; c <= e.c; c++) {
            if (r !== s.r || c !== s.c) {
              skip.add(`${r - START_ROW},${c}`);
            }
          }
        }
      });

      // Исправляем мержи шапки месяцев
      fixHeaderMerges(processedData, mergeMapLocal, skip);

      setTableData(processedData);
      setMergeMap(mergeMapLocal);
      setSkipCells(skip);
    } catch {
      setError("Ошибка загрузки");
    } finally {
      setLoading(false);
    }
  };

  const HEADER_ROWS_COUNT = 4;

  const filteredData = useMemo(() => {
    const headers = tableData.slice(0, HEADER_ROWS_COUNT);
    const body = tableData.slice(HEADER_ROWS_COUNT);

    const filteredBody = body.filter((row) => {
      const text = row.join(" ").toLowerCase();
      if (search && !text.includes(search.toLowerCase())) return false;
      if (filter) return row.some((cell) => cell === filter);
      return true;
    });

    return [...headers, ...filteredBody];
  }, [tableData, search, filter]);

  const renderTable = () => {
    return filteredData.map((row, i) => {
      const cells = [];
      for (let j = 0; j < totalCols; j++) {
        const key = `${i},${j}`;
        if (skipCells.has(key)) continue;

        const merge = mergeMap.get(key);
        const val = row[j] ?? "";

        cells.push(
          <td
            key={j}
            rowSpan={merge?.rowSpan}
            colSpan={merge?.colSpan}
            className={getCellClass(val)}
          >
            <div className="cell-content" title={val}>
              {val}
            </div>
          </td>
        );
      }
      return <tr key={i}>{cells}</tr>;
    });
  };

  const downloadOriginalFile = () => {
    if (!originalFileBlob) return;
    const url = URL.createObjectURL(originalFileBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "kalendar-grafik-2025-2026.xls";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (loading) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="ui-wrapper">
      <h2 className="title">Календарный учебный график</h2>

      <button
        className="download-btn"
        onClick={downloadOriginalFile}
        disabled={!originalFileBlob}
        title="Скачать график учебного процесса (исходный файл)"
      >
        📥 Скачать график
      </button>

      <div className="toolbar">
        <input
          placeholder="Поиск..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select onChange={(e) => setFilter(e.target.value)}>
          <option value="">Все</option>
          {Object.keys(LEGEND).map((k) => (
            <option key={k} value={k}>
              {k} — {LEGEND[k]}
            </option>
          ))}
        </select>
      </div>

      <div className="legend">
        {Object.entries(LEGEND).map(([k, v]) => (
          <div key={k} className={`legend-item ${getCellClass(k)}`}>
            {k} — {v}
          </div>
        ))}
      </div>

      <div className="table-container">
        <table className="data-table">
          <colgroup>
            <col style={{ width: "80px" }} />
            <col style={{ width: "100px" }} />
            <col style={{ width: "160px" }} />
            {Array.from({ length: totalCols - 3 }).map((_, i) => (
              <col key={i} style={{ width: "28px" }} />
            ))}
          </colgroup>
          <tbody>{renderTable()}</tbody>
        </table>
      </div>
    </div>
  );
}