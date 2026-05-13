import { useEffect, useState } from "react";
import "./documents.css";

function Documents() {
    const [docs, setDocs] = useState([]);
    const [openId, setOpenId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/documents")
            .then(r => r.json())
            .then(data => { setDocs(data); setLoading(false); })
            .catch(() => setLoading(false));
    }, []);

    const toggle = (id) => setOpenId(prev => prev === id ? null : id);

    if (loading) return <div className="docs-page"><p style={{color:"white"}}>Загрузка...</p></div>;

    return (
        <div className="docs-page">
            <div className="docs-card">
                <h1>Документы для студентов</h1>

                <div className="docs-info-block">
                    <h2>Основные права и обязанности обучающихся</h2>

                    <p>
                        <b>Перевод:</b>
                    </p>
                    <ol>
                        <li>
                            Студентов в УГНТУ из других вузов осуществляется: <b>с 25 июня по 07 июля</b>
                        </li>
                        <li>
                            Студентов УГНТУ с одной специальности на другую осуществляется:{" "}
                            <b>с 25 января по 15 февраля</b>; <b>с 25 июня по 07 июля</b>
                        </li>
                    </ol>
                    <p>
                        Информацию о том как перевестись из других ВУЗов, с других факультетов или
                        с одной специальности на другую (в УГНТУ) на факультет заочного обучения
                        можно получить{" "}
                        <a href="https://www.rusoil.net/sveden/document" target="_blank" rel="noreferrer">
                            здесь
                        </a>
                    </p>

                    <h2>Отчисление студентов</h2>
                    <p>
                        Что нужно делать и что не нужно, чтобы не быть отчисленным, а также
                        порядок отчисления по собственному желанию предоставлен{" "}
                        <a href="https://www.rusoil.net/sveden/document" target="_blank" rel="noreferrer">
                            здесь
                        </a>
                    </p>

                    <h2>Восстановление ранее отчисленных студентов</h2>
                    <p>
                        Производится: <b>с 25 января по 15 февраля</b>; <b>с 20 августа по 10 сентября</b>
                    </p>
                    <p>
                        Если Вы отчислены из УГНТУ, но хотите и можете продолжить обучение на
                        факультете заочного обучения УГНТУ, ознакомьтесь с информацией{" "}
                        <a href="https://www.rusoil.net/sveden/document" target="_blank" rel="noreferrer">
                            здесь
                        </a>
                    </p>

                    <p className="docs-info-link">
                        <b>Ссылки: </b>
                        <a href="https://www.rusoil.net/sveden/document" target="_blank" rel="noreferrer">
                            https://www.rusoil.net/sveden/document
                        </a>
                    </p>
                </div>

                <div className="docs-list">
                    {docs.length === 0 && (
                        <p style={{ color: "#555", textAlign: "center" }}>Документы не найдены</p>
                    )}
                    {docs.map(doc => (
                        <div key={doc.id} className={`doc-item ${openId === doc.id ? "doc-item--open" : ""}`}>
                            <button className="doc-toggle" onClick={() => toggle(doc.id)}>
                                <span>{doc.title}</span>
                                <span className="doc-arrow">{openId === doc.id ? "▲" : "▼"}</span>
                            </button>
                            {openId === doc.id && (
                                <div className="doc-body">
                                    {doc.description && (
                                        <div
                                            className="doc-description ql-editor"
                                            dangerouslySetInnerHTML={{ __html: doc.description }}
                                        />
                                    )}
                                    {doc.fileName && (
                                        
                                        <a    href={`/api/documents/${doc.id}/file`}
                                            className="doc-download"
                                            download
                                        >
                                            📄 Скачать: {doc.fileName}
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Documents;