function CardItem({ item, onOpenModal }) {
    return (
        <div className="card">
            <div className="card-image">
                <img
                    src={card.imagePath || "/no-image.png"}
                    alt={card.title}
                />
            </div>

            <div className="card-content">
                <h4 className="card-title">{item.title}</h4>

                <div className="card_info">
                    <p>
                        <span className="card-label">Профиль:</span>
                        {item.profile}
                    </p>
                    <p>
                        <span className="card-label">Кафедра:</span>
                        {item.graduating}
                    </p>
                    <p>
                        <span className="card-label">Контакты:</span>
                        {item.contacts}
                    </p>
                    <p>
                        <span className="card-label">Срок:</span>
                        {item.duration}
                    </p>
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