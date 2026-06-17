import "../../styles.css";
import "./Contacts.css";

function Contacts() {
  return (
    <div className="contacts-page">
      <div className="contacts-page__inner">
        <h1 className="contacts-page__title">Контакты</h1>

        <div className="contacts-page__main">
          <div className="contacts-page__main-item">
            <span className="contacts-page__label">Телефон</span>
            <span className="contacts-page__value">+7 (347) 243-19-14</span>
          </div>
          <div className="contacts-page__main-item">
            <span className="contacts-page__label">Электронная почта</span>
            <span className="contacts-page__value">fzo@rusoil.net</span>
          </div>
        </div>

        <div className="contacts-page__block">
          <h2 className="contacts-page__block-title">Для ускорения решения вопроса</h2>
          <ul className="contacts-page__list">
            <li className="contacts-page__item">
              <span className="contacts-page__item-name">заказать направление</span>
              <span className="contacts-page__item-meta">ул. Космонавтов, д. 1, к. 212, тел.:8(347)242-42-18, fzo212-1@mail.ru</span>
            </li>
            <li className="contacts-page__item">
              <span className="contacts-page__item-name">техническая поддержка по системе дистанционного обучения</span>
              <span className="contacts-page__item-meta">cgsoil@mail.ru, ул. Космонавтов, д. 1, к. 439</span>
            </li>
            <li className="contacts-page__item">
              <span className="contacts-page__item-name">договора на обучение и оплата обучения</span>
              <span className="contacts-page__item-meta">ул. Космонавтов, д. 1, к. 216, тел.:8(347)243-17-52, 2431752@mail.ru</span>
            </li>
            <li className="contacts-page__item">
              <span className="contacts-page__item-name">справки-вызовы (подтверждения), личные карточки, зачётные книжки и студенческие билеты</span>
              <span className="contacts-page__item-meta">ул. Космонавтов, д. 1, к. 220, тел.:8(347)243-19-71, fzo220-2@mail.ru</span>
            </li>
            <li className="contacts-page__item">
              <span className="contacts-page__item-name">академический отпуск, отчисление/восстановление, перевод на другую специальность, перевод в другой ВУЗ (из другого ВУЗа), выписки из приказов</span>
              <span className="contacts-page__item-meta">ул. Космонавтов, д. 1, к. 218, тел.:8(347)243-19-14, fzo218-1@mail.ru</span>
            </li>
            <li className="contacts-page__item">
              <span className="contacts-page__item-name">запрос справок о периоде обучения для перевода в другой ВУЗ</span>
              <span className="contacts-page__item-meta">ул. Космонавтов, д. 1, к. 212, тел.:8(347)242-42-18, fzo212-3@mail.ru</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Contacts;