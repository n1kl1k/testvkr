import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles.css";

const searchablePages = [
  { title: "Главная", path: "/", keywords: "главная основная" },
  { title: "Личный кабинет", path: "https://ams.rusoil.net/pcs/?w_mnews", external: true, keywords: "кабинет личный аккаунт" },
  { title: "Расписание", path: "https://lks.rusoil.net/schedule", external: true, keywords: "расписание пары" },
  { title: "График учебного процесса", path: "/students/timetable", keywords: "график учебный процесс" },
  { title: "Библиотека УГНТУ", path: "/students/bible", keywords: "библиотека книги" },
  { title: "Документы", path: "/students/documents", keywords: "документы бланки" },
  { title: "Студенческие олимпиады", path: "https://rusoil.net/ru/page/studencheskie-olimpiady", external: true, keywords: "олимпиады" },
  { title: "Платформа OILEDU", path: "https://oiledu.ru/", external: true, keywords: "oiledu обучение" },
  { title: "Студенческий городок", path: "/students/studcity", keywords: "городок общежитие" },
  { title: "Вопросы к поступлению", path: "/abiturient/faq", keywords: "поступление вопросы абитуриенту" },
  { title: "Карточки специальностей", path: "/abiturient/card", keywords: "специальности карточки направления" },
  { title: "Общая информация", path: "/about/info", keywords: "факультет информация" },
  { title: "Соц. сети", path: "/about/sociallinks", keywords: "соцсети социальные сети" },
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Filter search results
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const q = searchQuery.toLowerCase();
    const filtered = searchablePages.filter(p =>
      p.title.toLowerCase().includes(q) || p.keywords.toLowerCase().includes(q)
    );
    setSearchResults(filtered.slice(0, 6));
  }, [searchQuery]);

  // Close search dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearchDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchResults.length) {
      const first = searchResults[0];
      first.external ? (window.location.href = first.path) : navigate(first.path);
      setSearchQuery("");
      setShowSearchDropdown(false);
      setMenuOpen(false);
    }
  };

  const handleResultClick = (page) => {
    page.external ? (window.location.href = page.path) : navigate(page.path);
    setSearchQuery("");
    setShowSearchDropdown(false);
    setMenuOpen(false);
  };

  const toggleMenu = () => setMenuOpen(prev => !prev);
  const closeMenu = () => {
    setMenuOpen(false);
    setOpenDropdown(null);
  };

  const toggleMobileDropdown = (idx) => {
    setOpenDropdown(prev => prev === idx ? null : idx);
  };

  return (
    <header className="header">
      <div className="header-container">

        {/* Logo */}
        <Link to="/" className="logo-link" onClick={closeMenu}>
          <img src="/logo.JPG" alt="УГНТУ" className="logo" />
        </Link>

        {/* Burger (mobile only) */}
        <div
          className={`burger ${menuOpen ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label="Меню"
          role="button"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Navigation */}
        <nav className={`nav ${menuOpen ? "open" : ""}`}>
          <ul className="nav-menu">

            <li>
              <Link to="/" onClick={closeMenu}>Главная</Link>
            </li>

            <li className={`dropdown ${openDropdown === 0 ? "open" : ""}`}>
              <button
                className="dropdown-trigger"
                onClick={() => toggleMobileDropdown(0)}
              >
                Студенту
              </button>
              <ul className="dropdown-menu">
                <li><a href="https://ams.rusoil.net/pcs/?w_mnews" onClick={closeMenu}>Личный кабинет</a></li>
                <li><a href="https://lks.rusoil.net/schedule" onClick={closeMenu}>Расписание</a></li>
                <li><Link to="/students/timetable" onClick={closeMenu}>График уч. процесса</Link></li>
                <li><Link to="/students/bible" onClick={closeMenu}>Библиотека</Link></li>
                <li><Link to="/students/documents" onClick={closeMenu}>Документы</Link></li>
                <li><a href="https://oiledu.ru/" onClick={closeMenu}>OILEDU</a></li>
                <li><Link to="/students/studcity" onClick={closeMenu}>Студгородок</Link></li>
              </ul>
            </li>

            <li className={`dropdown ${openDropdown === 1 ? "open" : ""}`}>
              <button
                className="dropdown-trigger"
                onClick={() => toggleMobileDropdown(1)}
              >
                Абитуриенту
              </button>
              <ul className="dropdown-menu">
                <li><Link to="/abiturient/faq" onClick={closeMenu}>Вопросы к поступлению</Link></li>
                <li><Link to="/abiturient/card" onClick={closeMenu}>Карточки специальностей</Link></li>
              </ul>
            </li>

            <li className={`dropdown ${openDropdown === 2 ? "open" : ""}`}>
              <button
                className="dropdown-trigger"
                onClick={() => toggleMobileDropdown(2)}
              >
                О факультете
              </button>
              <ul className="dropdown-menu">
                <li><Link to="/about/info" onClick={closeMenu}>Общая информация</Link></li>
                <li><Link to="/about/sociallinks" onClick={closeMenu}>Соц. сети</Link></li>
              </ul>
            </li>

          </ul>
        </nav>

        {/* Search */}
        <div className="search-wrapper" ref={searchRef}>
          <form onSubmit={handleSearchSubmit} className="search-form">
            <input
              type="text"
              placeholder="Поиск..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchDropdown(true);
              }}
              onFocus={() => setShowSearchDropdown(true)}
              className="search-input"
            />
            <button type="submit" className="search-button">🔍</button>
          </form>

          {showSearchDropdown && searchQuery && (
            <div className="search-dropdown">
              {searchResults.length ? (
                searchResults.map((res, i) => (
                  <div key={i} className="search-result" onClick={() => handleResultClick(res)}>
                    <span className="result-icon">📄</span>
                    <div>
                      <strong>{res.title}</strong>
                      <small>{res.external ? "внешняя ссылка" : "страница сайта"}</small>
                    </div>
                  </div>
                ))
              ) : (
                <div className="search-empty">😕 Ничего не найдено</div>
              )}
            </div>
          )}
        </div>

      </div>
    </header>
  );
}

export default Header;
