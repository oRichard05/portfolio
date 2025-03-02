import React, { useState, useEffect, useRef } from 'react';
import '../styles/Taskbar.css';

const Taskbar = ({ time, apps = [] }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [news, setNews] = useState([]);
    const [visibleNews, setVisibleNews] = useState([]);
    const newsIndexRef = useRef(0);
    const menuRef = useRef(null);
    const startButtonRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target) &&
                startButtonRef.current &&
                !startButtonRef.current.contains(event.target)
            ) {
                setMenuOpen(false);
            }
        };

        if (menuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuOpen]);

    // Busca notícias uma vez quando o componente monta
    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch(
                    `https://newsapi.org/v2/top-headlines?country=us&apiKey=59b8c0cabcf8445393f25e6060f533c7`
                );
                const data = await response.json();
                if (data.articles && data.articles.length > 0) {
                    setNews(data.articles);
                    setVisibleNews(data.articles.slice(0, 4)); // Mostra as 4 primeiras
                }
            } catch (error) {
                console.error('Erro ao buscar notícias:', error);
            }
        };

        fetchNews();
    }, []);

    // Alterna as notícias a cada 10 segundos
    useEffect(() => {
        if (news.length === 0) return;

        const interval = setInterval(() => {
            setVisibleNews((prevNews) => {
                let nextIndex = newsIndexRef.current + 4;
                if (nextIndex >= news.length) {
                    nextIndex = 0; // Reinicia se passar do limite
                }
                newsIndexRef.current = nextIndex;
                return news.slice(nextIndex, nextIndex + 4);
            });
        }, 7000); // 

        return () => clearInterval(interval);
    }, [news]); // Dependendo de `news`, para atualizar corretamente

    return (
        <>
            <div className="taskbar">
                <div ref={startButtonRef} className="start-button" onClick={() => setMenuOpen(!menuOpen)}></div>
                <div className="taskbar-search">
                    <input type="text" readOnly />
                </div>
                <div className="taskbar-time">{time.toLocaleTimeString()}</div>
            </div>

            {menuOpen && (
                <div ref={menuRef} className="menu-popup">
                    <div className="menu-left">
                        <div className="menu-buttons">
                            <div className="menu-button">
                                <img src="/images/profile.png" alt="Perfil" />
                            </div>
                            <div className="menu-button">
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
                                        <img src={article.urlToImage} alt={article.title} className="news-image" />
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
