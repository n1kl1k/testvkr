import { Link } from "react-router-dom"; 
import "../styles.css";
import NewsList from "../components/NewsList";
import SubscribeBox from "../components/SubscribeBox";

function Home() {
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

            <Link to="/students/timetable" className="link-card">
              <h3>График учебного процесса</h3>
              <p>Ознакомьтесь с графиком учебного процесса</p>
            </Link>

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
