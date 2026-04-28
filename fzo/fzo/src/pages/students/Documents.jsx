import "/src/styles.css";
import "./documents.css";

function Documents() {
  return (
    <div className="docs-page">
      <div className="docs-card">

        <h1>Документы для студентов</h1>

        <div className="docs-section">
          <h2>Основные права и обязанности обучающихся</h2>

          <p>
            Перевод студентов:
            <br />• из других вузов — с 25 июня по 07 июля
            <br />• внутри УГНТУ — с 25 января по 15 февраля и с 25 июня по 07 июля
          </p>

          <p>
            Информацию о переводе на факультет заочного обучения можно получить здесь.
          </p>
        </div>

        <div className="docs-section">
          <h2>Отчисление</h2>
          <p>
            Порядок отчисления и рекомендации для студентов доступны здесь.
          </p>
        </div>

        <div className="docs-section">
          <h2>Восстановление</h2>
          <p>
            Восстановление студентов проводится:
            <br />• с 25 января по 15 февраля
            <br />• с 20 августа по 10 сентября
          </p>
        </div>

        <div className="docs-links">
          <h2>Образцы заявлений</h2>

          <div className="docs-grid">
            <a href="/blank-zayavl-perevod-razn-napravl.doc">Перевод студента</a>
            <a href="/Otchislenie-sob.doc">Отчисление</a>
            <a href="/Vosstanovlenie-stud (1).doc">Восстановление</a>
            <a href="/soglasie.doc">Персональные данные</a>
            <a href="/Akadem-otp.doc">Академический отпуск</a>
            <a href="/Akadem-vozvr.doc">Возврат из академа</a>
            <a href="/zayavl-drug-vuz.doc">Перевод из вуза</a>
            <a href="/zayavl-ind-plan.docx">Индивидуальный план</a>
            <a href="/predost-grafika.doc">График обучения</a>
            <a href="/zamena-fam-imya.doc">Смена ФИО</a>
            <a href="/Perevod_dr.doc">Справка перевода</a>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Documents;