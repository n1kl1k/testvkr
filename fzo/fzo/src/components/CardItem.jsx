function CardItem({ item, onOpenModal }) {
    return (
        <div className="card">
            <div className="card-image">
                <img
                    src={
                        item.img
                            ? `http://84.38.180.188${item.img}`
                            : "/no-image.png"
                    }
                    alt={item.title}
                />
            </div>

            <div className="card-content">
                <h4 className="card-title">{item.title}</h4>

                <div className="card_info">
                    <p><b>Профиль:&nbsp;</b> {item.profile || "—"}</p>
                    <p><b>Кафедра:&nbsp;</b> {item.graduating || "—"}</p>
                    <p><b>Контакты:&nbsp;</b> {item.contacts || "—"}</p>
                    <p><b>Срок:&nbsp;</b> {item.duration || "—"}</p>
                </div>

                <button
                    className="info_btn"
                    onClick={() => onOpenModal(item.cardId)}
                >
                    Подробнее →
                </button>
            </div>
        </div>
    );
}

export default CardItem;