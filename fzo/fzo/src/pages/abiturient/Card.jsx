import { useEffect, useState } from "react";
import CardList from "../../components/CardList";
import Modal from "../../components/ModalItem";
import "./cards.css";

const LEVELS = ["Бакалавриат", "Специалитет", "Магистратура", "СПО"];

function CardsPage() {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [activeLevel, setActiveLevel] = useState("Бакалавриат");

    const [selectedCardTitle, setSelectedCardTitle] = useState("");
    const [modalDetails, setModalDetails] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetch("/api/cards")
            .then((res) => {
                if (!res.ok) throw new Error("Ошибка загрузки");
                return res.json();
            })
            .then(setCards)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    const filteredCards = activeLevel === "<Бакалавриат>"
        ? cards
        : cards.filter((card) =>
            card.plans?.some((plan) => plan.score === activeLevel)
        );

    const handleCardSelect = (id) => {
        const card = cards.find((c) => c.cardId === id);
        if (!card) return;

        setSelectedCardTitle(card.title);
        setIsModalOpen(true);
        setModalDetails(null);

        fetch(`/api/cards/${id}/details`)
            .then((res) => {
                if (!res.ok) throw new Error("Ошибка загрузки");
                return res.json();
            })
            .then(setModalDetails)
            .catch(() => setModalDetails({ error: "Ошибка загрузки данных" }));
    };

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>Ошибка: {error}</p>;

    return (
        <>
            <h1 className="otstup">Направления</h1>

            <div className="admission-contacts">
                <div className="admission-contacts__inner">

                    <div className="admission-contacts__filters">
                        {LEVELS.map((level) => (
                            <button
                                key={level}
                                className={`level-btn admission-level-btn ${activeLevel === level ? "active" : ""}`}
                                onClick={() => setActiveLevel(level)}
                            >
                                {level}
                            </button>
                        ))}
                    </div>

                    <div className="admission-contacts__divider-h" />

                    <div className="admission-contacts__grid">
                        <div className="admission-contacts__item">
                            <div className="admission-contacts__label">Телефон</div>
                            <a href="tel:88005514528" className="admission-contacts__value">8 (800) 55-14-528</a>
                        </div>
                        <div className="admission-contacts__item">
                            <div className="admission-contacts__label">Email</div>
                            <a href="mailto:pkugntu@mail.ru" className="admission-contacts__value">pkugntu@mail.ru</a>
                        </div>
                        <div className="admission-contacts__item">
                            <div className="admission-contacts__label">Адрес</div>
                            <span className="admission-contacts__value">
                                ул. Первомайская 14, корпус УГНТУ №8,<br/>
                                г. Уфа, Республика Башкортостан, 450064,<br/>
                                каб. 301, 308
                            </span>
                        </div>
                        <div className="admission-contacts__item">
                            <div className="admission-contacts__label">Режим работы</div>
                            <span className="admission-contacts__value">Пн–Пт: 10:00 – 17:00<br/>(обед 13:00 – 14:00)<br/>Приём документов начинается с 20 июня</span>
                        </div>
                    </div>

                </div>
            </div>
            <CardList cards={filteredCards} onCardSelect={handleCardSelect} />

            {activeLevel === "Специалитет" && (
            <p className="prep-note">
                * — дистанционное обучение составляет 3 (три) семестра.
            </p>
            )}
            {activeLevel === "Магистратура" && (
            <p className="prep-note">
                * - дистанционное обучение составляет 2 (два)семестра.
            </p>
            )}
            {activeLevel === "Бакалавриат" && (
            <p className="prep-note">
                 
            </p>
            )}
            {activeLevel === "СПО" && (
            <p className="prep-note">
                 
            </p>
            )}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                details={modalDetails}
                title={selectedCardTitle}
            />
        </>
    );
}

export default CardsPage;