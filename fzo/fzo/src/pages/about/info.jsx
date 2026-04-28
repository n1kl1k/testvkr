import React, { useEffect } from "react";
import "./info.css";

const Info = () => {
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
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    const statCards = document.querySelectorAll(".stat-card");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    });

    statCards.forEach((card) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(20px)";
      card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(card);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="library-body">
      <div className="document-wrapper">
        <div className="document-container">
          <div className="document-header">
            <h1 className="document-title">
              Факультет заочного обучения
            </h1>
          </div>

          <div className="document-content">
            {/* Основная задача */}
            <section className="content-section">
              <h2 className="section-title">Основная задача факультета</h2>
              <div className="mission-card">
                <p>
                  Основной задачей факультета заочного обучения (ФЗО) УГНТУ является подготовка специалистов с высшим образованием без отрыва от производства. Перечень специальностей, по которым ведется обучение, формируется в соответствии с запросами производства.
                </p>
                <p>
                  Современная идея «учение через всю жизнь» воплощается в широком спектре программ, по которым ведется обучение на всех уровнях подготовки: СПО, бакалавриат, специалитет, магистратура на платной и бюджетной основе.
                </p>
              </div>
            </section>

            {/* Юбилей */}
            <div className="anniversary-banner">
              <div className="anniversary-text">
                65-летний юбилей ФЗО
              </div>
              <div className="anniversary-subtext">
                В 2025 году факультет заочного обучения отмечает 65 лет успешной работы
              </div>
            </div>

            {/* Статистика */}
            <section className="content-section">
              <h2 className="section-title">Наши достижения</h2>
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-number">17 000+</div>
                  <div className="stat-label">выпускников за 65 лет</div>
                </div>

                <div className="stat-card">
                  <div className="stat-number">13 700+</div>
                  <div className="stat-label">специалистов</div>
                </div>

                <div className="stat-card">
                  <div className="stat-number">2 600+</div>
                  <div className="stat-label">бакалавров</div>
                </div>

                <div className="stat-card">
                  <div className="stat-number">700+</div>
                  <div className="stat-label">магистров</div>
                </div>
              </div>
            </section>

            {/* Программы */}
            <section className="content-section">
              <h2 className="section-title">
                Образовательные программы 2025-2026
              </h2>

              <div className="programs-section">
                <div className="programs-grid">
                  <div className="program-card">
                    <h4>Специалитет</h4>
                    <ul className="program-list">
                      <li>9 программ подготовки</li>
                      <li>Горно-нефтяной профиль</li>
                      <li>Трубопроводный транспорт</li>
                      <li>Механический профиль</li>
                    </ul>
                  </div>

                  <div className="program-card">
                    <h4>Бакалавриат</h4>
                    <ul className="program-list">
                      <li>7 направлений подготовки</li>
                      <li>Автоматизация</li>
                      <li>Электроэнергетика</li>
                      <li>Технические специальности</li>
                    </ul>
                  </div>

                  <div className="program-card">
                    <h4>Магистратура</h4>
                    <ul className="program-list">
                      <li>7 магистерских программ</li>
                      <li>Углубленная подготовка</li>
                      <li>Научно-исследовательская работа</li>
                    </ul>
                  </div>

                  <div className="program-card">
                    <h4>СПО</h4>
                    <ul className="program-list">
                      <li>4 программы</li>
                      <li>Среднее профессиональное образование</li>
                      <li>Расширяемый спектр программ</li>
                    </ul>
                  </div>
                </div>

                <div className="programs-extra">
                  <p>
                    <strong>
                      В настоящее время на факультете обучаются более 3 000 студентов, проживающих в различных регионах России и зарубежья.
                    </strong>
                  </p>
                </div>
              </div>
            </section>

            {/* Цель */}
            <section className="content-section">
              <h2 className="section-title">Стратегическая цель</h2>
              <div className="goal-section">
                <p>
                  Стратегической целью Факультета заочного обучения является подготовка высококвалифицированных конкурентоспособных специалистов для топливно-энергетического комплекса страны, повышение имиджа университета, как устойчиво развивающегося образовательного и научно-технического инновационного центра.
                </p>
                <p>
                  Факультет интегрирован в международное образовательное пространство, способен эффективно решать научно-технические и социально-экономические проблемы современного общества, способствует развитию трансфера знаний и технологий.
                </p>
              </div>
            </section>

            {/* Приоритет */}
            <section className="content-section">
              <h2 className="section-title">Приоритетное направление</h2>
              <div className="mission-card">
                <p>
                  Приоритетным направлением в деятельности Факультета заочного обучения является повышение качества обучения, с учетом новых достижений науки и техники, в соответствии с требованиями работодателей и Федерального государственного образовательного стандарта (ФГОС).
                </p>
              </div>
            </section>

            {/* Контакты */}
            <section className="contacts-section">
              <h2 className="section-title">Контакты</h2>

              <div className="contacts-grid">
                <div className="contact-card address">
                  <h3>Адрес деканата</h3>
                  <div className="contact-info">
                    <p>450064, г.Уфа, ул. Космонавтов, 1,<br />
                    уч. корпус 1, каб. 212, 218, 220
                    </p>
                  </div>
                </div>

                <div className="contact-card phone">
                  <h3>Телефоны</h3>
                  <div className="contact-info">
                    <p>(347) 243-19-14<br />
                    (347) 243-19-71<br />
                    (347) 242-42-18
                    </p>
                  </div>
                </div>

                <div className="contact-card email">
                  <h3>Электронная почта</h3>
                  <div className="contact-info">
                    <a href="mailto:fzo@ugntu.ru" className="contact-link">
                      fzo@ugntu.ru
                    </a>
                  </div>
                </div>

                <div className="contact-card social">
                  <h3>Социальные сети</h3>
                  <div className="contact-info">
                    <a href="#" className="contact-link">
                      ФЗО ВКонтакте
                    </a>
                    <br />
                    <a href="/" className="contact-link">
                      Сайт факультета
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <button className="scroll-top">↑</button>
    </div>
  );
};

export default Info;