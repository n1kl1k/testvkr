import { useEffect, useRef, useState } from "react";
import "./News.css";

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("ru-RU");
}

function wrapTables(container) {

  if (!container) return;

  const tables = container.querySelectorAll("table");

  tables.forEach((table) => {

    if (table.parentElement.classList.contains("table-wrapper")) {
      return;
    }

    const wrapper = document.createElement("div");

    wrapper.className = "table-wrapper";

    table.parentNode.insertBefore(wrapper, table);

    wrapper.appendChild(table);
  });
}

function NewsItem({ item }) {

  const [open, setOpen] = useState(false);

  const shortRef = useRef(null);

  const fullRef = useRef(null);

  useEffect(() => {

    wrapTables(shortRef.current);

    wrapTables(fullRef.current);

  }, [open]);

  return (

    <article className="news-item">

      <div className="news-header">

        <h3 className="news-title">
          {item.title}
        </h3>

        <span className="news-date">
          {formatDate(item.date)}
        </span>

      </div>

      <div
        ref={shortRef}
        className="news-preview news-content"
        dangerouslySetInnerHTML={{
          __html: item.shortText
        }}
      />

      {open && (

        <div
          ref={fullRef}
          className="news-full news-content"
          dangerouslySetInnerHTML={{
            __html: item.fullText
          }}
        />

      )}

      <button
        className="news-toggle-btn"
        onClick={() => setOpen(!open)}
      >

        {open
          ? "Свернуть"
          : "Читать подробнее"}

      </button>

    </article>
  );
}

export default NewsItem;