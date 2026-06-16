function Modal({ isOpen, onClose, details, title }) {
    if (!isOpen) return null;

    console.log("Modal details:", details);

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
                            <div className="modal-section">
                                <h3 className="section-title">Чему научат</h3>
                                <p className="opisanie" style={{ whiteSpace: "pre-line" }}>
                                    {details.additionalInfo || "Нет описания"}
                                </p>
                            </div>

                            <div className="modal-section">
                                <h3 className="section-title">Кем работать</h3>
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

                            <div className="modal-section">
                                <h3 className="section-title">Где работать</h3>
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
                            
                            <div className="modal-section">
                                <h3 className="modal-section-title">Для поступления: </h3>
                                {details.requirements && details.requirements.length > 0 ? (() => {
                                    const hasBase = details.requirements.some(r => r.basePlan);
                                    const hasSpo  = details.requirements.some(r => r.spoPlan);
                                    return (
                                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                                            <thead>
                                                <tr>
                                                    {hasBase && <th style={{ textAlign: "left", padding: "8px 12px", borderBottom: "2px solid #e0e0e0", color: "#1E3A5F", fontSize: "13px" }}>Базовый план</th>}
                                                    {hasSpo  && <th style={{ textAlign: "left", padding: "8px 12px", borderBottom: "2px solid #e0e0e0", color: "#1E3A5F", fontSize: "13px" }}>СПО план</th>}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {details.requirements.map((req, idx) => (
                                                    <tr key={idx}>
                                                        {hasBase && <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", fontSize: "14px" }}>{req.basePlan || ""}</td>}
                                                        {hasSpo  && <td style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", fontSize: "14px" }}>{req.spoPlan || ""}</td>}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    );
                                })() : (
                                    <p className="no-data">Нет данных</p>
                                )}
                            </div>

                            <div className="modal-section">
                                <h3 className="section-title"> План приёма</h3>
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