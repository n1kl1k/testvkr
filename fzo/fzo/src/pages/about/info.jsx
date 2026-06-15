import React, { useState, useEffect } from "react";
import "./info.css";

const gratitudeLetters = [
  {
    id: 1,
    from: "МодульНефтеГазИнжиниринг",
    year: "2025",
    file: "/МодульНефтеГазИнжиниринг.pdf",
  },
  {
    id: 2,
    from: "Компенсатор",
    year: "2025",
    file: "/NPP-Kompensator.pdf",
  },
  {
    id: 3,
    from: "КранСервисПроект",
    year: "2025",
    file: "/bp_KranServisProekt.pdf",
  },
];

const PdfModal = ({ letter, onClose }) => {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="pdf-overlay" onClick={onClose}>
      <div className="pdf-modal" onClick={(e) => e.stopPropagation()}>
        <div className="pdf-modal-header">
          <div className="pdf-modal-title">
            <span className="pdf-modal-badge">PDF</span>
            <span>{letter.from} — {letter.year} г.</span>
          </div>
          <div className="pdf-modal-controls">
            <a
              href={letter.file}
              download
              className="pdf-ctrl-btn"
              title="Скачать"
            >
              ⬇ Скачать
            </a>
            <a
              href={letter.file}
              target="_blank"
              rel="noopener noreferrer"
              className="pdf-ctrl-btn"
              title="Открыть в новой вкладке"
            >
              ↗ Открыть
            </a>
            <button className="pdf-close-btn" onClick={onClose}>✕</button>
          </div>
        </div>
        <div className="pdf-modal-body">
          <iframe
            src={letter.file}
            title={`Благодарственное письмо — ${letter.from}`}
            className="pdf-iframe"
          />
        </div>
      </div>
    </div>
  );
};

const Info = () => {
  const [activePdf, setActivePdf] = useState(null);

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

    return () => { window.removeEventListener("scroll", handleScroll); };
  }, []);

  return (
    <div className="library-body">
      <div className="document-wrapper">
        <div className="document-container">
          <div className="document-header">
            <h1 className="document-title">Факультет заочного обучения</h1>
          </div>

          <div className="document-content">

            <section className="content-section">
              <h2 className="section-title">Основная задача факультета</h2>
              <div className="mission-card">
                <p>Основной задачей факультета заочного обучения (ФЗО) УГНТУ является подготовка специалистов с высшим образованием без отрыва от производства. Перечень специальностей, по которым ведется обучение, формируется в соответствии с запросами производства.</p>
                <p>Современная идея «учение через всю жизнь» воплощается в широком спектре программ, по которым ведется обучение на всех уровнях подготовки: СПО, бакалавриат, специалитет, магистратура на платной и бюджетной основе.</p>
              </div>
            </section>
            <section className="content-section">
              <h2 className="section-title">Декан факультета</h2>
              <div className="dean-card">
                <div className="dean-photo-wrapper">
                  <img src="/Dekan.jpg" alt="Декан" className="dean-photo-img" />
                </div>
                <div className="dean-info">
                  <div className="dean-name">Альмухаметов Азат Ахатович</div>
                  <div className="dean-title">Декан факультета заочного обучения</div>
                  <div className="dean-degree">Кандидат технических наук, доцент</div>
                  <div className="dean-divider" />
                  <div className="dean-contacts">
                    <a href="mailto:fzo@rusoil.net" className="dean-contact-link">
                      <span className="dean-contact-icon"></span> fzo@rusoil.net
                    </a>
                    <span className="dean-contact-link">
                      <span className="dean-contact-icon"></span> +7 (347) 243-19-14
                    </span>
                  </div>
                </div>
              </div>
            </section>

            <div className="anniversary-banner">
              <div className="anniversary-text">65-летний юбилей ФЗО</div>
              <div className="anniversary-subtext">В 2025 году факультет заочного обучения отмечает 65 лет успешной работы</div>
            </div>

            <section className="content-section">
              <h2 className="section-title">Наши достижения</h2>
              <div className="stats-grid">
                <div className="stat-card"><div className="stat-number">17 000+</div><div className="stat-label">выпускников за 65 лет</div></div>
                <div className="stat-card"><div className="stat-number">13 700+</div><div className="stat-label">специалистов</div></div>
                <div className="stat-card"><div className="stat-number">2 600+</div><div className="stat-label">бакалавров</div></div>
                <div className="stat-card"><div className="stat-number">700+</div><div className="stat-label">магистров</div></div>
              </div>
            </section>

            <section className="content-section">
              <h2 className="section-title">Образовательные программы</h2>
              <div className="programs-section">
                <div className="programs-grid">
                  <div className="program-card">
                    <h4>Специалитет</h4>
                    <ul className="program-list">
                      <li>9 программ подготовки</li><li>Горно-нефтяной профиль</li>
                      <li>Трубопроводный транспорт</li><li>Механический профиль</li>
                    </ul>
                  </div>
                  <div className="program-card">
                    <h4>Бакалавриат</h4>
                    <ul className="program-list">
                      <li>7 направлений подготовки</li><li>Автоматизация</li>
                      <li>Электроэнергетика</li><li>Технические специальности</li>
                    </ul>
                  </div>
                  <div className="program-card">
                    <h4>Магистратура</h4>
                    <ul className="program-list">
                      <li>7 магистерских программ</li><li>Углубленная подготовка</li>
                      <li>Научно-исследовательская работа</li>
                    </ul>
                  </div>
                  <div className="program-card">
                    <h4>СПО</h4>
                    <ul className="program-list">
                      <li>4 программы</li><li>Среднее профессиональное образование</li>
                      <li>Расширяемый спектр программ</li>
                    </ul>
                  </div>
                </div>
                <div className="programs-extra">
                  <p><strong>В настоящее время на факультете обучаются более 3 000 студентов, проживающих в различных регионах России и зарубежья.</strong></p>
                </div>
              </div>
            </section>

            <section className="content-section">
              <h2 className="section-title">Стратегическая цель</h2>
              <div className="goal-section">
                <p>Стратегической целью Факультета заочного обучения является подготовка высококвалифицированных конкурентоспособных специалистов для топливно-энергетического комплекса страны, повышение имиджа университета, как устойчиво развивающегося образовательного и научно-технического инновационного центра.</p>
                <p>Факультет интегрирован в международное образовательное пространство, способен эффективно решать научно-технические и социально-экономические проблемы современного общества, способствует развитию трансфера знаний и технологий.</p>
              </div>
            </section>

            <section className="content-section">
              <h2 className="section-title">Приоритетное направление</h2>
              <div className="mission-card">
                <p>Приоритетным направлением в деятельности Факультета заочного обучения является повышение качества обучения, с учетом новых достижений науки и техники, в соответствии с требованиями работодателей и Федерального государственного образовательного стандарта (ФГОС).</p>
              </div>
            </section>

            <section className="content-section">
              <h2 className="section-title">Благодарственные письма</h2>
              <div className="letters-grid">
                {gratitudeLetters.map((letter) => (
                  <div key={letter.id} className="letter-card">
                    <div className="letter-body">
                      <div className="letter-from">{letter.from}</div>
                      <div className="letter-year">{letter.year} г.</div>
                    </div>
                    <div className="letter-actions">
                      <button
                        className="letter-btn letter-btn--view"
                        onClick={() => setActivePdf(letter)}
                      >
                        Просмотр
                      </button>
                      <a
                        href={letter.file}
                        download
                        className="letter-btn letter-btn--download"
                      >
                        Скачать
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="contacts-section">
              <h2 className="section-title">Контакты</h2>
              <div className="contacts-grid">
                <div className="contact-card address">
                  <h3>Адрес деканата</h3>
                  <div className="contact-info"><p>450064, г.Уфа, ул. Космонавтов, 1,<br />уч. корпус 1, каб. 212, 218, 220</p></div>
                </div>
                <div className="contact-card phone">
                  <h3>Телефоны</h3>
                  <div className="contact-info"><p>(347) 243-19-14 (аудит. 1-218)<br />(347) 243-19-71 (аудит. 1-220)<br />(347) 242-42-18 (аудит. 1-212)</p></div>
                </div>
                <div className="contact-card email">
                  <h3>Электронная почта</h3>
                  <div className="contact-info"><a href="mailto:dot-fzo@mail.ru" className="contact-link">dot-fzo@mail.ru</a></div>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>

      <button className="scroll-top">↑</button>

      {activePdf && (
        <PdfModal letter={activePdf} onClose={() => setActivePdf(null)} />
      )}
    </div>
  );
};

export default Info;