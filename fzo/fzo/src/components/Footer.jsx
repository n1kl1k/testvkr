import { Link } from "react-router-dom";

const CONTACTS_MAIN = {
  phone: { display: "+7 (347) 243-19-14", href: "tel:+73472431914" },
  email: { display: "fzo@rusoil.net", href: "mailto:fzo@rusoil.net" },
  address: "ул. Космонавтов, д. 1",
};

const CONTACTS_LIST = [
  {
    id: 1,
    label: "Заказать направление",
    room: "212",
    phone: { display: "8(347)242-42-18", href: "tel:+73472424218" },
    email: "fzo212-1@mail.ru",
  },
  {
    id: 2,
    label: "Техническая поддержка по системе дистанционного обучения",
    room: "439",
    phone: null,
    email: "cgsoil@mail.ru",
  },
  {
    id: 3,
    label: "Договора на обучение и оплата обучения",
    room: "216",
    phone: { display: "8(347)243-17-52", href: "tel:+73472431752" },
    email: "2431752@mail.ru",
  },
  {
    id: 4,
    label: "Справки-вызовы (подтверждения),личные карточки, зачётные книжки и студенческие билеты",
    room: "220",
    phone: { display: "8(347)243-19-71", href: "tel:+73472431971" },
    email: "fzo220-2@mail.ru",
  },
  {
    id: 5,
    label: "Академечиский отпуск, отчисление/восстановление, перевод, выписки из приказов",
    room: "218",
    phone: { display: "8(347)243-19-14", href: "tel:+73472431914" },
    email: "fzo218-1@mail.ru",
  },
  {
    id: 6,
    label: "Справки о периоде обучения для перевода в другой вуз",
    room: "212",
    phone: { display: "8(347)242-42-18", href: "tel:+73472424218" },
    email: "fzo212-3@mail.ru",
  },
];

function ContactItem({ item }) {
  return (
    <div className="contact-item">
      <span className="contact-label">{item.label}</span>
      <span className="contact-meta">
        к.&nbsp;{item.room}
        {item.phone && (
          <>
            {" · "}
            <a href={item.phone.href} className="contact-link">
              {item.phone.display}
            </a>
          </>
        )}
        {" · "}
        <a href={`mailto:${item.email}`} className="contact-link">
          {item.email}
        </a>
      </span>
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">

        {/* Контакты */}
        <div className="footer-section footer-section--contacts">
          <h4 className="footer-heading">Контакты</h4>

          <div className="contacts-main">
            <a href={CONTACTS_MAIN.phone.href} className="contact-main-link">
              {CONTACTS_MAIN.phone.display}
            </a>
            <a href={CONTACTS_MAIN.email.href} className="contact-main-link">
              {CONTACTS_MAIN.email.display}
            </a>
          </div>

          <p className="contacts-hint">
            {CONTACTS_MAIN.address}. Для ускорения решения вопроса:
          </p>

          <div className="contacts-list">
            {CONTACTS_LIST.map((item) => (
              <ContactItem key={item.id} item={item} />
            ))}
          </div>
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