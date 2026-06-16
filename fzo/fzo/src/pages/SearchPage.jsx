import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import staticIndex from "../data/searchIndex.js";

export default function Search() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [index, setIndex] = useState(staticIndex);
    const navigate = useNavigate();
    const wrapperRef = useRef(null);

    useEffect(() => {
        fetch("/api/cards")
            .then(r => r.json())
            .then(cards => {
                const dynamic = cards.map(c => ({
                    path: "/cards",
                    name: c.title,
                    content: `${c.title} ${c.profile || ""} ${c.graduating || ""} направление специальность`
                }));
                setIndex([...staticIndex, ...dynamic]);
            })
            .catch(() => {});
    }, []);

    useEffect(() => {
        const handler = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setResults([]);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const handleChange = (e) => {
        const q = e.target.value;
        setQuery(q);

        if (!q.trim()) { setResults([]); return; }

        const q_lower = q.toLowerCase();
        const seen = new Set();
        const found = index.filter(page => {
            const matches =
                page.name.toLowerCase().includes(q_lower) ||
                page.content.toLowerCase().includes(q_lower);
            const key = page.path + page.name;
            if (matches && !seen.has(key)) {
                seen.add(key);
                return true;
            }
            return false;
        }).slice(0, 6); 

        setResults(found);
    };

    const handleSelect = (path) => {
        navigate(path);
        setQuery("");
        setResults([]);
    };

    return (
        <div className="search-wrapper" ref={wrapperRef}>
            <form className="search" onSubmit={(e) => e.preventDefault()}>
                <input
                    type="text"
                    placeholder="Поиск по сайту..."
                    value={query}
                    onChange={handleChange}
                />
                <button type="submit">🔍</button>
            </form>

            {results.length > 0 && (
                <div className="search-dropdown">
                    {results.map((r, i) => (
                        <div
                            key={i}
                            className="search-dropdown-item"
                            onClick={() => handleSelect(r.path)}
                        >
                            <span className="search-item-name">{r.name}</span>
                            <span className="search-item-path">{r.path}</span>
                        </div>
                    ))}
                </div>
            )}

            {query.trim() && results.length === 0 && (
                <div className="search-dropdown">
                    <div className="search-dropdown-item search-no-results">
                        Ничего не найдено
                    </div>
                </div>
            )}
        </div>
    );
}