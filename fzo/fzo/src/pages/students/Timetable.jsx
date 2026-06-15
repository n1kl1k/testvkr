import { useEffect, useState } from "react";
import "./timetable.css";

export default function Timetable() {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("/api/excel/list")
            .then(r => { if (!r.ok) throw new Error("Ошибка загрузки"); return r.json(); })
            .then(data => { setFiles(data); setLoading(false); })
            .catch(e => { setError(e.message); setLoading(false); });
    }, []);

    const formatDate = (iso) => {
        const d = new Date(iso);
        return d.toLocaleDateString("ru-RU", {
            day: "2-digit", month: "2-digit", year: "numeric"
        });
    };

    if (loading) return <div className="tt-loading">Загрузка...</div>;
    if (error)   return <div className="tt-error">{error}</div>;

    return (
        <div className="tt-wrapper">
            <h2 className="tt-title">Календарный учебный график</h2>

            {files.length === 0 && (
                <p className="tt-empty">Графики не загружены</p>
            )}

            <div className="tt-list">
                {files.map(file => (
                    <div key={file.id} className={`tt-card ${file.active ? "tt-card--active" : ""}`}>
                        <div className="tt-card__icon">📅</div>

                        <div className="tt-card__info">
                            <p className="tt-card__name">{file.originalFileName}</p>
                            {file.description && (
                                <p className="tt-card__desc">{file.description}</p>
                            )}
                            <p className="tt-card__date">Загружен: {formatDate(file.uploadDate)}</p>
                        </div>

                        {file.active && (
                            <span className="tt-card__badge">Активный</span>
                        )}

                        <a
                            href={`/api/excel/download/${file.id}`}
                            className="tt-card__btn"
                            download
                        >
                            📥 Скачать
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}