import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-section">
          <h4>Контакты</h4>
          <p>+7 (347) 243-19-14</p>
          <p>fzo@rusoil.net</p>
        </div>

        <div className="footer-section">
          <h4>Факультет</h4>
          <Link to="/about/info">Общая информация</Link>
          <Link to="/about/sociallinks">Социальные сети</Link>
        </div>

        <div className="footer-section">
          <h4>Студенту</h4>
          <Link to="/students/documents">Документы</Link>
          <Link to="/students/bible">Библиоткета</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Факультет заочного обучения УГНТУ</p>
      </div>
    </footer>
  );
}

export default Footer;
