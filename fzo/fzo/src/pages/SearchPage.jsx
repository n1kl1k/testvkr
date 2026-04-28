import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Search() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const pages = [
    { name: "График", path: "/students/timetable" },
    { name: "FAQ", path: "/abiturient/faq" },
    { name: "Информация", path: "/about/info" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();

    const found = pages.find(p =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );

    if (found) {
      navigate(found.path);
    } else {
      alert("Ничего не найдено");
    }
  };

  return (
    <form className="search" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Поиск по сайту..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">🔍</button>
    </form>
  );
}