import { useEffect, useState } from "react";
import bibleData from "../../data/bibleData.js";
import "./styles_bible.css";

function Bible() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>

      <div className="document-wrapper">
        <div className="document-container">
          <div className="document-header">
            <p className="approval">
              Утверждено Решением Ученого совета УГНТУ 20.06.2003
            </p>
          </div>

          <div className="document-content">
            <h1 className="document-title">
              ПРАВИЛА ПОЛЬЗОВАНИЯ БИБЛИОТЕКОЙ
            </h1>

            {bibleData.map((chapter) => (
              <section className="chapter" id={chapter.id} key={chapter.id}>
                <h2>{chapter.title}</h2>
                {chapter.sections &&
                  chapter.sections.map((sec, i) => (
                    <div className="clause" key={i}>
                      <div className="clause-header">
                        <span className="clause-number">{sec.number}</span>
                        <h3>{sec.title}</h3>
                      </div>

                      {sec.text &&
                        sec.text.map((p, idx) => (
                          <p
                            key={idx}
                            className={
                              p.important
                                ? "important"
                                : p.warning
                                ? "warning"
                                : ""
                            }
                          >
                            {p.content}
                          </p>
                        ))}

                      {sec.list && (
                        <ul className="obligations-list">
                          {sec.list.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}

                {chapter.subchapters &&
                  chapter.subchapters.map((sub, i) => (
                    <div key={i} className="subchapter">
                      
                      {sub.title && <h3>{sub.title}</h3>}

                      {sub.clauses.map((clause, j) => (
                        <div className="clause" key={j}>
                          <div className="clause-header">
                            <span className="clause-number">{clause.number}</span>
                            <h3>{clause.title}</h3>
                          </div>

                          {clause.text &&
                            clause.text.map((p, idx) => (
                              <p
                                key={idx}
                                className={
                                  p.important
                                    ? "important"
                                    : p.warning
                                    ? "warning"
                                    : ""
                                }
                              >
                                {p.content}
                              </p>
                            ))}

                          {clause.list && (
                            <ul className="obligations-list">
                              {clause.list.map((item, idx) => (
                                <li key={idx}>{item}</li>
                              ))}
                            </ul>
                          )}

                          {clause.note && (
                            <p className="note">{clause.note}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
              </section>
            ))}
          </div>
        </div>
      </div>

      <div className="doc-nav">
        <ul>
          {bibleData.map((ch) => (
            <li key={ch.id}>
              <button onClick={() => scrollTo(ch.id)}>
                {ch.title}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {showTop && (
        <button
          className="scroll-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          ↑
        </button>
      )}

    </>
  );
}

export default Bible;