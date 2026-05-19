import React, { useState, useEffect } from "react";
import "./info.css";

// ✏️ Укажите пути к вашим PDF-файлам в массиве ниже.
// Файлы можно положить в папку public/letters/ вашего проекта.
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
    file: "/bp_KranServisProekt.jpg",
  },
];

/* ── PDF-модалка ── */
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

/* ── Основной компонент ── */
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

            {/* Основная задача */}
            <section className="content-section">
              <h2 className="section-title">Основная задача факультета</h2>
              <div className="mission-card">
                <p>Основной задачей факультета заочного обучения (ФЗО) УГНТУ является подготовка специалистов с высшим образованием без отрыва от производства. Перечень специальностей, по которым ведется обучение, формируется в соответствии с запросами производства.</p>
                <p>Современная идея «учение через всю жизнь» воплощается в широком спектре программ, по которым ведется обучение на всех уровнях подготовки: СПО, бакалавриат, специалитет, магистратура на платной и бюджетной основе.</p>
              </div>
            </section>

            {/* Декан факультета */}
            <section className="content-section">
              <h2 className="section-title">Декан факультета</h2>
              <div className="dean-card">
                <div className="dean-photo-wrapper">
                  {/* ✏️ Замените div ниже на <img src="путь/к/фото.jpg" alt="Декан" className="dean-photo-img" /> */}
                  <div className="dean-photo-placeholder">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="none" className="dean-avatar-icon">
                      <circle cx="40" cy="30" r="18" fill="#1E3A5F" opacity="0.35" />
                      <ellipse cx="40" cy="68" rx="26" ry="16" fill="#1E3A5F" opacity="0.25" />
                    </svg>
                    <span className="dean-photo-label">Фото декана</span>
                  </div>
                </div>
                <div className="dean-info">
                  <div className="dean-name">Иванов Иван Иванович</div>
                  <div className="dean-title">Декан факультета заочного обучения</div>
                  <div className="dean-degree">Доктор технических наук, профессор</div>
                  <div className="dean-divider" />
                  <p className="dean-bio">
                    Руководит факультетом заочного обучения с 2010 года. Автор более 120 научных публикаций в области нефтяной инженерии и педагогики высшей школы. Под его руководством факультет значительно расширил спектр образовательных программ и установил партнёрские связи с ведущими предприятиями топливно-энергетического комплекса.
                  </p>
                  <div className="dean-contacts">
                    <a href="mailto:dean.fzo@rusoil.net" className="dean-contact-link">
                      <span className="dean-contact-icon">✉</span> dean.fzo@rusoil.net
                    </a>
                    <span className="dean-contact-link">
                      <span className="dean-contact-icon">☎</span> (347) 243-19-14
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Юбилей */}
            <div className="anniversary-banner">
              <div className="anniversary-text">65-летний юбилей ФЗО</div>
              <div className="anniversary-subtext">В 2025 году факультет заочного обучения отмечает 65 лет успешной работы</div>
            </div>

            {/* Статистика */}
            <section className="content-section">
              <h2 className="section-title">Наши достижения</h2>
              <div className="stats-grid">
                <div className="stat-card"><div className="stat-number">17 000+</div><div className="stat-label">выпускников за 65 лет</div></div>
                <div className="stat-card"><div className="stat-number">13 700+</div><div className="stat-label">специалистов</div></div>
                <div className="stat-card"><div className="stat-number">2 600+</div><div className="stat-label">бакалавров</div></div>
                <div className="stat-card"><div className="stat-number">700+</div><div className="stat-label">магистров</div></div>
              </div>
            </section>

            {/* Программы */}
            <section className="content-section">
              <h2 className="section-title">Образовательные программы 2025-2026</h2>
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

            {/* Цель */}
            <section className="content-section">
              <h2 className="section-title">Стратегическая цель</h2>
              <div className="goal-section">
                <p>Стратегической целью Факультета заочного обучения является подготовка высококвалифицированных конкурентоспособных специалистов для топливно-энергетического комплекса страны, повышение имиджа университета, как устойчиво развивающегося образовательного и научно-технического инновационного центра.</p>
                <p>Факультет интегрирован в международное образовательное пространство, способен эффективно решать научно-технические и социально-экономические проблемы современного общества, способствует развитию трансфера знаний и технологий.</p>
              </div>
            </section>

            {/* Приоритет */}
            <section className="content-section">
              <h2 className="section-title">Приоритетное направление</h2>
              <div className="mission-card">
                <p>Приоритетным направлением в деятельности Факультета заочного обучения является повышение качества обучения, с учетом новых достижений науки и техники, в соответствии с требованиями работодателей и Федерального государственного образовательного стандарта (ФГОС).</p>
              </div>
            </section>

            {/* Благодарственные письма */}
            <section className="content-section">
              <h2 className="section-title">Благодарственные письма</h2>
              <div className="letters-grid">
                {gratitudeLetters.map((letter) => (
                  <div key={letter.id} className="letter-card">
                    <div className="letter-pdf-icon">
                      <div className="letter-pdf-badge">PDF</div>
                    </div>
                    <div className="letter-body">
                      <div className="letter-from">{letter.from}</div>
                      <div className="letter-year">{letter.year} г.</div>
                    </div>
                    <div className="letter-actions">
                      <button
                        className="letter-btn letter-btn--view"
                        onClick={() => setActivePdf(letter)}
                      >
                        👁 Просмотр
                      </button>
                      <a
                        href={letter.file}
                        download
                        className="letter-btn letter-btn--download"
                      >
                        ⬇ Скачать
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Контакты */}
            <section className="contacts-section">
              <h2 className="section-title">Контакты</h2>
              <div className="contacts-grid">
                <div className="contact-card address">
                  <h3>Адрес деканата</h3>
                  <div className="contact-info"><p>450064, г.Уфа, ул. Космонавтов, 1,<br />уч. корпус 1, каб. 212, 218, 220</p></div>
                </div>
                <div className="contact-card phone">
                  <h3>Телефоны</h3>
                  <div className="contact-info"><p>(347) 243-19-14<br />(347) 243-19-71<br />(347) 242-42-18</p></div>
                </div>
                <div className="contact-card email">
                  <h3>Электронная почта</h3>
                  <div className="contact-info"><a href="mailto:fzo@rusoil.net" className="contact-link">fzo@rusoil.net</a></div>
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