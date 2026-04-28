import CardItem from "./CardItem";

function CardList({ cards, onCardSelect }) {
    if (!cards || cards.length === 0) {
        return <p style={{ color: "white" }}>Карточек нет</p>;
    }

    return (
        <section className="cards">
            <div className="container__cards">
                {cards.map((item) => (
                    <CardItem
                        key={item.cardId}
                        item={item}
                        onOpenModal={onCardSelect}
                    />
                ))}
            </div>
        </section>
    );
}

export default CardList;