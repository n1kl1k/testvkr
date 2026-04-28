import "../styles.css";
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
            <a href="about/info.html">Общая информация</a>
            <a href="about/sociallinks.html">Социальные сети</a>
        </div>
        <div className="footer-section">
            <h4>Студенту</h4>
            <a href="students/timetable.html">График учебного процесса</a>
            <a href="students/studcity.html">Студенческий городок</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;