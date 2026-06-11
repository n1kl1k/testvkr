import { useEffect, useState } from "react";
import CardList from "../../components/CardList";
import Modal from "../../components/ModalItem";
import "./cards.css";

const LEVELS = ["Бакалавриат", "Магистратура", "Специалитет", "СПО"];

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

            <div className="level-filter">
                {LEVELS.map((level) => (
                    <button
                        key={level}
                        className={`level-btn ${activeLevel === level ? "active" : ""}`}
                        onClick={() => setActiveLevel(level)}
                    >
                        {level}
                    </button>
                ))}
            </div>

            <CardList cards={filteredCards} onCardSelect={handleCardSelect} />
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