import { Link } from "react-router-dom";
import "./style.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">

        {/* Контакты */}
        <div className="footer-section footer-section--contacts">
          <h4 className="footer-heading">Контакты</h4>
          <p className="footer-text">+7 (347) 243-19-14</p>
          <p className="footer-text">fzo@rusoil.net</p>

          <p className="contacts-body">
            Для ускорения решения вопроса<br />
            -заказать направление (ул. Космонавтов, д. 1, к. 212, тел.:8(347)242-42-18, fzo212-1@mail.ru);<br />
            - техническая поддержка по системе дистанционного обучения (cgsoil@mail.ru, ул. Космонавтов, д. 1, к. 439);<br />
            - договора на обучение и оплата обучения (ул. Космонавтов, д. 1, к. 216, тел.:8(347)243-17-52, 2431752@mail.ru);<br />
            - справки-вызовы (подтверждения), личные карточки, зачётные книжки и студенческие билеты (ул. Космонавтов, д. 1, к. 220, тел.:8(347)243-19-71, fzo220-2@mail.ru);<br />
            - академический отпуск, отчисление/восстановление, перевод на другую специальность, перевод в другой ВУЗ (из другого ВУЗа), выписки из приказов (ул. Космонавтов, д. 1, к. 218, тел.:8(347)243-19-14, fzo218-1@mail.ru);<br />
            - запрос справок о периоде обучения для перевода в другой ВУЗ (ул. Космонавтов, д. 1, к. 212, тел.:8(347)242-42-18, fzo212-3@mail.ru);
          </p>
        </div>

        {/* Факультет */}
        <div className="footer-section">
          <h4 className="footer-heading">Факультет</h4>
          <Link to="/about/info" className="footer-link">Общая информация</Link>
          <Link to="/about/sociallinks" className="footer-link">Социальные сети</Link>
        </div>

        {/* Студенту */}
        <div className="footer-section">
          <h4 className="footer-heading">Студенту</h4>
          <Link to="/students/documents" className="footer-link">Документы</Link>
          <Link to="/students/bible" className="footer-link">Библиотека</Link>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Факультет заочного обучения УГНТУ</p>
      </div>
    </footer>
  );
}

export default Footer;