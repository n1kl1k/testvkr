function CardItem({ item, onOpenModal }) {
    return (
        <div className="card">
            <div className="card-image">
                <img
                    src={
                        item.imagePath
                            ? `http://84.38.180.188:8080${item.img}`
                            : "/no-image.png"
                    }
                    alt={item.title}
                />
            </div>

            <div className="card-content">
                <h4 className="card-title">{item.title}</h4>

                <div className="card_info">
                    <p><b>Профиль:</b> {item.profile || "—"}</p>
                    <p><b>Кафедра:</b> {item.graduating || "—"}</p>
                    <p><b>Контакты:</b> {item.contacts || "—"}</p>
                    <p><b>Срок:</b> {item.duration || "—"}</p>
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