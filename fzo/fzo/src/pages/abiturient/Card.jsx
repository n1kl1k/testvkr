// CardsPage.jsx
import { useEffect, useState } from "react";
import CardList from "../../components/CardList";
import Modal from "../../components/ModalItem";
import "./cards.css";

function CardsPage() {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [selectedCardTitle, setSelectedCardTitle] = useState("");
    const [modalDetails, setModalDetails] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetch("http://84.38.180.188:8080/api/cards")
            .then((res) => {
                if (!res.ok) throw new Error("Ошибка загрузки");
                return res.json();
            })
            .then(setCards)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    const handleCardSelect = (id) => {
        const card = cards.find((c) => c.cardId === id);
        if (!card) return;

        setSelectedCardTitle(card.title);
        setIsModalOpen(true);
        setModalDetails(null);

        fetch(`http://84.38.180.188:8080/api/cards/${id}/details`)
            .then((res) => {
                if (!res.ok) throw new Error("Ошибка загрузки");
                return res.json();
            })
            .then(setModalDetails)
            .catch(() =>
                setModalDetails({ error: "Ошибка загрузки данных" })
            );
    };

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>Ошибка: {error}</p>;

    return (
        <>
            <h1 className="otstup">Направления</h1>
            <CardList cards={cards} onCardSelect={handleCardSelect} />
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