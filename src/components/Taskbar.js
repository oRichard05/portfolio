import React, { useState, useEffect, useRef } from 'react';
import '../styles/Taskbar.css';

const Taskbar = ({ time, openApp }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [news, setNews] = useState([]);
    const [visibleNews, setVisibleNews] = useState([]);
    const newsIndexRef = useRef(0);
    const menuRef = useRef(null);
    const startButtonRef = useRef(null);
    const searchInputRef = useRef(null);
    const suggestionsRef = useRef(null);
    const [searchText, setSearchText] = useState('');

    const suggestions = ["Projects", "About Me", "Contacts", "My PC"];

    const filteredSuggestions = searchText
        ? suggestions.filter(s => s.toLowerCase().includes(searchText.toLowerCase()))
        : [];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (suggestionsRef.current && !suggestionsRef.current.contains(event.target) &&
                searchInputRef.current && !searchInputRef.current.contains(event.target)) {
                setSearchText('');
            }
            if (menuRef.current && !menuRef.current.contains(event.target) &&
                startButtonRef.current && !startButtonRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=59b8c0cabcf8445393f25e6060f533c7');
                const data = await response.json();
                if (data.articles?.length > 0) {
                    setNews(data.articles);
                    setVisibleNews(data.articles.slice(0, 4));
                }
            } catch (error) {
                console.error('Erro ao buscar notícias:', error);
            }
        };

        fetchNews();
    }, []);

    useEffect(() => {
        if (!news.length) return;
        const interval = setInterval(() => {
            let nextIndex = newsIndexRef.current + 4;
            if (nextIndex >= news.length) nextIndex = 0;
            newsIndexRef.current = nextIndex;
            setVisibleNews(news.slice(nextIndex, nextIndex + 4));
        }, 7000);

        return () => clearInterval(interval);
    }, [news]);

    return (
        <>
            <div className="taskbar">
                <div ref={startButtonRef} className="start-button" onClick={() => setMenuOpen(!menuOpen)}></div>
                <div className="taskbar-search">
                    <input ref={searchInputRef} type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                </div>
                <div className="taskbar-time">{time.toLocaleTimeString()}</div>
            </div>

            {searchText && filteredSuggestions.length > 0 && (
                <div ref={suggestionsRef} className="search-suggestions">
                    {filteredSuggestions.map((s, index) => (
                        <div key={index} className="suggestion-item" onClick={() => openApp(s)}>
                            {s}
                        </div>
                    ))}
                </div>
            )}

            {menuOpen && (
                <div ref={menuRef} className="menu-popup">
                    <div className="menu-left">
                        <div className="menu-buttons">
                            <div className="menu-button" onClick={() => alert('Desligando...')}>
                                <img src="/images/turnoff.png" alt="Desligar" />
                            </div>
                        </div>
                    </div>
                    <div className="menu-news">
                        <h3>News</h3>
                        {visibleNews.length > 0 ? (
                            <div className="news-grid">
                                {visibleNews.map((article, index) => (
                                    <a key={index} href={article.url} target="_blank" rel="noopener noreferrer" className="news-box">
                                        <img src={article.urlToImage || '/images/default-news.png'} alt={article.title} className="news-image" />
                                        <div className="news-title">{article.title}</div>
                                    </a>
                                ))}
                            </div>
                        ) : (
                            <p>No news available</p>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Taskbar;
