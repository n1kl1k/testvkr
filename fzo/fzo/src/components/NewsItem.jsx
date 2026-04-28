import { useState } from "react";

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("ru-RU");
}

function NewsItem({ item }) {
  const [open, setOpen] = useState(false);

  return (
    <article className="news-item">
      <div className="news-header">
        <h3 className="news-title">{item.title}</h3>
        <span className="news-date">{formatDate(item.date)}</span>
      </div>

      <div
        className="news-preview"
        dangerouslySetInnerHTML={{ __html: item.shortText }}
      />

      {open && (
        <div
          className="news-full"
          dangerouslySetInnerHTML={{ __html: item.fullText }}
        />
      )}

      <button
        className="news-toggle-btn"
        onClick={() => setOpen(!open)}
      >
        {open ? "Свернуть" : "Читать подробнее"}
      </button>
    </article>
  );
}

export default NewsItem;