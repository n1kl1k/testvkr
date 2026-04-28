function Modal({ isOpen, onClose, details, title }) {
    if (!isOpen) return null;

    console.log("Modal details:", details); // для отладки

    return (
        <div className="modal active" onClick={onClose}>
            <div className="modal__main" onClick={(e) => e.stopPropagation()}>
                <div className="modal__header">
                    <h2 className="modal__title">{title}</h2>
                    <button className="modal__close" onClick={onClose}>✕</button>
                </div>

                <div className="modal__body">
                    {!details && <p>Загрузка...</p>}
                    {details?.error && <p>{details.error}</p>}

                    {details && !details.error && (
                        <>
                            {/* Описание */}
                            <div className="modal-section">
                                <h3 className="section-title">📄 Описание</h3>
                                <p className="opisanie">{details.additionalInfo || "Нет описания"}</p>
                            </div>

                            {/* Деятельность */}
                            <div className="modal-section">
                                <h3 className="section-title">⚡ Деятельность</h3>
                                {details.activities && details.activities.length > 0 ? (
                                    <ul className="feature-list">
                                        {details.activities.map((a, i) => (
                                            <li key={i}>{a}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="no-data">Нет данных</p>
                                )}
                            </div>

                            {/* Партнёры */}
                            <div className="modal-section">
                                <h3 className="section-title">🤝 Партнёры</h3>
                                {details.partners && details.partners.length > 0 ? (
                                    <div className="companies-grid">
                                        {details.partners.map((p, i) => (
                                            <span key={i} className="company-tag">{p}</span>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="no-data">Нет данных</p>
                                )}
                            </div>

                            {/* План приёма */}
                            <div className="modal-section">
                                <h3 className="section-title">📊 План приёма</h3>
                                {details.plans && details.plans.length > 0 ? (
                                    <div className="admission-plans">
                                        {details.plans.map((plan, idx) => (
                                            <div key={idx} className="admission-plan-card">
                                                <div className="plan-item">
                                                    <span className="plan-label">Бюджетные места</span>
                                                    <span className="plan-value">{plan.budget ?? "—"}</span>
                                                </div>
                                                <div className="plan-item">
                                                    <span className="plan-label">Платные места</span>
                                                    <span className="plan-value">{plan.paid ?? "—"}</span>
                                                </div>
                                                <div className="plan-item">
                                                    <span className="plan-label">Проходной балл</span>
                                                    <span className="plan-value">{plan.score ?? "—"}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="no-data">Нет данных о приёме</p>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Modal;