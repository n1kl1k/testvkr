import React, { useEffect } from "react";
import "./sociallinks.css";

const SocialLinks = () => {
  useEffect(() => {
    const scrollButton = document.querySelector(".scroll-top");

    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        scrollButton.style.display = "block";
      } else {
        scrollButton.style.display = "none";
      }
    };

    window.addEventListener("scroll", handleScroll);

    scrollButton.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    const cards = document.querySelectorAll(".social-card");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    });

    cards.forEach((card) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(30px)";
      card.style.transition = "0.6s";
      observer.observe(card);
    });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="library-body">
      <div className="social-wrapper">
        <div className="social-container">
          <div className="social-header">
            <h1 className="social-title">Социальные сети Факультета заочного обучения</h1>
            <p className="social-subtitle">
              Будьте в курсе последних новостей и событий факультета
            </p>
          </div>

          <div className="social-content">
            {/* СОЦ СЕТИ */}
            <div className="social-grid">
              <div className="social-card vk">
                <div className="social-card-header">
                  <h3 className="social-card-title">ВКонтакте</h3>
                </div>
                <div className="social-card-body">
                  <p className="social-description">
                    Официальная группа факультета. Новости, мероприятия,
                    фотографии и общение со студентами.
                  </p>
                  <a href="https://vk.com/fzo_ugntu" className="social-link">
                    Перейти
                  </a>
                </div>
              </div>

              <div className="social-card telegram">
                <div className="social-card-header">
                  <h3 className="social-card-title">MAX</h3>
                </div>
                <div className="social-card-body">
                  <p className="social-description">
                    Быстрые новости и важные объявления в удобном формате.
                  </p>
                  <a className="social-link">
                    +7(347)243-19-14<br />
                    243-19-71,<br/>
                    242-42-18.
                  </a>
                </div>
              </div>

              <div className="social-card youtube">
                <div className="social-card-header">
                  <h3 className="social-card-title">YouTube</h3>
                </div>
                <div className="social-card-body">
                  <p className="social-description">
                    Видео о жизни факультета, лекции и мероприятия.
                  </p>
                  <a href="https://www.youtube.com/@%D0%A4%D0%97%D0%9E%D0%A3%D0%93%D0%9D%D0%A2%D0%A3" className="social-link">
                    Смотреть
                  </a>
                </div>
              </div>

            </div>

            {/* КОНТАКТЫ */}
            <div className="contact-info">
              <h3 className="contact-title">Другие способы связи</h3>

              <div className="contact-links">
                <a className="contact-link">
                  dot-fzo@mail.ru
                </a>

                <a className="contact-link">
                  Тел.(факс): +7 (347) 243-19-14 (ауд. 1-218)<br/>
                  Тел.(факс): +7 (347) 242-42-18 (ауд. 1-212)<br/>
                  Тел.(факс): +7 (347) 243-19-71 (ауд. 1-220)
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button className="scroll-top">↑</button>
    </div>
  );
};

export default SocialLinks;