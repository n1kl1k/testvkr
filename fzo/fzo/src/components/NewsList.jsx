import { useEffect, useState } from "react";
import NewsItem from "./NewsItem";

function NewsList() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://84.38.180.188:8080/api/news")
      .then((res) => {
        if (!res.ok) throw new Error("Ошибка загрузки");
        return res.json();
      })
      .then((data) => {
        data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setNews(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Загрузка новостей...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  if (news.length === 0) {
    return <p>Новостей пока нет</p>;
  }

  return (
    <section className="news-section">
      {news.map((item) => (
        <NewsItem key={item.id} item={item} />
      ))}
    </section>
  );
}

export default NewsList;