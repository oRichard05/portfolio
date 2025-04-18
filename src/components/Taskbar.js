import React, { useState, useEffect, useRef } from 'react';
import ShutdownConfirmation from './ShutdownConfirmation';
import ShutdownEffect from './ShutdownEffect';
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
    const [showShutdown, setShowShutdown] = useState(false);
    const [isShuttingDown, setIsShuttingDown] = useState(false);

    const suggestions = ["Projects", "AboutMe", "Contacts", "MyPC"];

    const filteredSuggestions = searchText
        ? suggestions.filter(s => s.toLowerCase().includes(searchText.toLowerCase()))
        : [];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                suggestionsRef.current &&
                !suggestionsRef.current.contains(event.target) &&
                searchInputRef.current &&
                !searchInputRef.current.contains(event.target)
            ) {
                setSearchText('');
            }
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target) &&
                startButtonRef.current &&
                !startButtonRef.current.contains(event.target)
            ) {
                setMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const apiKey = process.env.REACT_APP_NYTIMES_API_KEY;
                const response = await fetch(`https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${apiKey}`);
                const data = await response.json();
                if (data.results?.length > 0) {
                    setNews(data.results);
                    setVisibleNews(data.results.slice(0, 4));
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

    const handleShutdown = () => {
        setShowShutdown(false);
        setIsShuttingDown(true);
    };

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
                        <div key={index} className="suggestion-item" onClick={() => {
                            openApp(s);
                            setTimeout(() => setSearchText(""), 100);
                        }}>
                            {s}
                        </div>
                    ))}
                </div>
            )}

            {menuOpen && (
                <div ref={menuRef} className="menu-popup">
                    <div className="menu-left">
                        <div className="menu-buttons">
                            <div className="menu-button" onClick={() => setShowShutdown(true)}>
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
                                        <img src={article.multimedia?.[0]?.url || '/images/default-news.png'} alt={article.title} className="news-image" />
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

            {showShutdown && <ShutdownConfirmation onCancel={() => setShowShutdown(false)} onShutdown={handleShutdown} />}
            {isShuttingDown && <ShutdownEffect onComplete={() => { window.location.reload(); }} />}
        </>
    );
};

export default Taskbar;
