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

                <div className="docs-list">
                    {docs.length === 0 && (
                        <p style={{ color: "white" }}>Документы не найдены</p>
                    )}
                    {docs.map(doc => (
                        <div key={doc.id} className={`doc-item ${openId === doc.id ? "doc-item--open" : ""}`}>
                            <button
                                className="doc-toggle"
                                onClick={() => toggle(doc.id)}
                            >
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
                                        
                                          <a  href={`/api/documents/${doc.id}/file`}
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