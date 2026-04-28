import { useState } from "react";
import "../styles.css";

function SubscribeBox() {
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubscribe = async () => {
    if (!email) return;

    try {
      await fetch("http://localhost:8080/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });

      setEmail("");
      setOpen(false);
      alert("Подписка оформлена!");
    } catch (e) {
      alert("Ошибка подписки");
    }
  };

  return (
    <div className={`subscribe-widget ${open ? "open" : ""}`}>
      
      {!open ? (
        <div
          className="subscribe-tab"
          onClick={() => setOpen(true)}
        >
          📩 Новости
        </div>
      ) : (
        <div className="subscribe-panel">
          <div className="subscribe-title">
            Подписка
            <span onClick={() => setOpen(false)}>✖</span>
          </div>

          <input
            type="email"
            placeholder="Ваш email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button onClick={handleSubscribe}>
            Подписаться
          </button>
        </div>
      )}
    </div>
  );
}

export default SubscribeBox;