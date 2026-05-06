import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-section">
          <h4>Контакты</h4>
          <p>📞 (347) 243-19-14</p>
          <p>📧 fzo@ugntu.ru</p>
        </div>

        <div className="footer-section">
          <h4>Факультет</h4>
          <Link to="/about/info">Общая информация</Link>
          <Link to="/about/sociallinks">Социальные сети</Link>
        </div>

        <div className="footer-section">
          <h4>Студенту</h4>
          <Link to="/students/timetable">График учебного процесса</Link>
          <Link to="/students/studcity">Студенческий городок</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Факультет ЗО УГНТУ</p>
      </div>
    </footer>
  );
}

export default Footer;
