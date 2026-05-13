import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles.css";
import NewsList from "../components/NewsList";
import SubscribeBox from "../components/SubscribeBox";

function Home() {
  const [downloading, setDownloading] = useState(false);

  const downloadTimetable = async () => {
    setDownloading(true);
    try {
      const nameRes = await fetch("/api/excel/current-name");
      if (!nameRes.ok) throw new Error("Файл не найден");
      const filename = await nameRes.text();

      const res = await fetch(`/${encodeURIComponent(filename)}`);
      if (!res.ok) throw new Error("Ошибка загрузки");
      const buffer = await res.arrayBuffer();

      const blob = new Blob([buffer], { type: "application/vnd.ms-excel" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch {
      alert("Не удалось скачать файл");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <>
      <div className="main-container">

        <section className="welcome-banner">
          <h1>Факультет заочного обучения УГНТУ</h1>
          <p>
            Образование без отрыва от производства - ваш путь к успешной карьере
          </p>
        </section>

        <section className="quick-links">
          <div className="links-grid">

            <a href="https://ams.rusoil.net/pcs/?w_mnews" className="link-card">
              <h3>Личный кабинет</h3>
              <p>Доступ к учебным материалам и оценкам</p>
            </a>

            <a href="https://lks.rusoil.net/schedule" className="link-card">
              <h3>Расписание</h3>
              <p>Актуальное расписание занятий</p>
            </a>

            <a href="https://oiledu.ru/" className="link-card">
              <h3>OILEDU</h3>
              <p>Платформа онлайн-курсов</p>
            </a>

            <Link to="/students/bible" className="link-card">
              <h3>Библиотека</h3>
              <p>Электронные ресурсы и каталоги</p>
            </Link>

            <button
              className="link-card"
              onClick={downloadTimetable}
              disabled={downloading}
            >
              <h3>График учебного процесса</h3>
              <p>{downloading ? "Загрузка..." : "Скачать график учебного процесса"}</p>
            </button>

          </div>
        </section>

        <section className="news-section">
          <SubscribeBox />
          <NewsList />
        </section>

      </div>
    </>
  );
}

export default Home;
