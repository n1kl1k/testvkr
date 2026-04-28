import { useState, useEffect } from "react";
import faqData from "../../data/faqData";
import "./faq.css";

function Faq() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [showTop, setShowTop] = useState(false);

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="faq-page">
      <div className="document-wrapper">
        <div className="document-container">

          {/* HEADER */}
          <div className="document-header">
            <h1 className="document-title">
              Часто задаваемые вопросы о поступлении в УГНТУ
            </h1>
            <p className="document-subtitle">
              Вся необходимая информация для абитуриентов
            </p>
          </div>

          {/* CONTENT */}
          <div className="document-content">
            <div className="faq-accordion">

              {faqData.map((item, i) => (
                <div className="faq-item" key={i}>

                  <button
                    className={`faq-question ${activeIndex === i ? "active" : ""}`}
                    onClick={() => toggle(i)}
                  >
                    {item.question}
                  </button>

                  <div
                    className={`faq-answer ${activeIndex === i ? "active" : ""}`}
                    dangerouslySetInnerHTML={{ __html: item.answer }}
                    >
                    
                  </div>

                </div>
              ))}

              {/* Контакты */}
              <div className="contact-info">
                <h3>Хотите узнать больше? Свяжитесь с нами!</h3>

                <div className="contact-links">
                  <a href="mailto:pkugntu@mail.ru" className="contact-link email">
                    pkugntu@mail.ru
                  </a>

                  <a href="tel:+78005514528" className="contact-link">
                    8 (800) 55-14-528
                  </a>

                  <a href="https://t.me/pkrusoil" className="contact-link telegram">
                    @pkrusoil
                  </a>

                  <a href="https://t.me/pkrusoil_news" className="contact-link telegram">
                    @pkrusoil_news
                  </a>

                  <a href="https://vk.com/pkrusoil" className="contact-link vk">
                    vk.com/pkrusoil
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* КНОПКА ВВЕРХ */}
      {showTop && (
        <button
          className="scroll-top"
          onClick={() =>
            window.scrollTo({ top: 0, behavior: "smooth" })
          }
        >
          ↑
        </button>
      )}
    </div>
  );
}

export default Faq;