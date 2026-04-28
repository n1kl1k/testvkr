import { useEffect, useMemo, useState } from "react";
import * as XLSX from "xlsx";
import "./timetable.css";

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

export default function Timetable() {
  const [tableData, setTableData] = useState([]);
  const [mergeMap, setMergeMap] = useState(new Map());
  const [skipCells, setSkipCells] = useState(new Set());
  const [totalCols, setTotalCols] = useState(0);
  const [originalFileBlob, setOriginalFileBlob] = useState(null); // 👈 для скачивания

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    loadFile();
  }, []);

  const loadFile = async () => {
    try {
      const res = await fetch("/kal-graf-2025-2026 (1).xls");
      const buffer = await res.arrayBuffer();

      // 👇 сохраняем Blob для скачивания
      const blob = new Blob([buffer], { type: "application/vnd.ms-excel" });
      setOriginalFileBlob(blob);

      const wb = XLSX.read(buffer, { type: "array" });

      const sheet = wb.Sheets[wb.SheetNames[0]];

      // ✅ ПРАВИЛЬНЫЙ ПАРСИНГ
      const rawData = XLSX.utils.sheet_to_json(sheet, {
        header: 1,
        raw: true,
        defval: null,
        blankrows: true,
      });

      // ✅ НОРМАЛИЗАЦИЯ (чтобы не ехали колонки)
      const maxCols = Math.max(...rawData.map((r) => r.length));

      const normalized = rawData.map((row) => {
        const r = [...row];
        while (r.length < maxCols) r.push(null);
        return r;
      });

      // ❗ ОГРАНИЧЕНИЕ СТРОК (13–164)
      const START_ROW = 11;
      const END_ROW = 163;

      const slicedData = normalized.slice(START_ROW, END_ROW);

      // ✅ ПРОТЯГИВАЕМ "курс"
      let lastCourse = "";
      const processedData = slicedData.map((row) => {
        const r = [...row];
        if (r[0]) lastCourse = r[0];
        else r[0] = lastCourse;
        return r;
      });

      // 📏 точное число колонок
      const range = XLSX.utils.decode_range(sheet["!ref"]);
      setTotalCols(range.e.c + 1);

      // ✅ merges (с учётом диапазона)
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

      setTableData(processedData);
      setMergeMap(mergeMapLocal);
      setSkipCells(skip);
    } catch {
      setError("Ошибка загрузки");
    } finally {
      setLoading(false);
    }
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

  // ❗ 4 строки: месяцы + пн + вск + номер недели
  const HEADER_ROWS_COUNT = 4;

  const filteredData = useMemo(() => {
    const headers = tableData.slice(0, HEADER_ROWS_COUNT);
    const body = tableData.slice(HEADER_ROWS_COUNT);

    const filteredBody = body.filter((row) => {
      const text = row.join(" ").toLowerCase();

      if (search && !text.includes(search.toLowerCase())) return false;

      if (filter) {
        return row.some((cell) => cell === filter);
      }

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

  // 👇 Функция скачивания исходного файла
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

      {/* 👇 Кнопка скачивания */}
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
          <tbody>{renderTable()}</tbody>
        </table>
      </div>
    </div>
  );
}