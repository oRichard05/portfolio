import { useState, useEffect, useRef } from "react";
import "../styles/OS.css";

const OS = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [time, setTime] = useState(new Date());
    const [openWindows, setOpenWindows] = useState([]);
    const [selectionBox, setSelectionBox] = useState(null);
    const desktopRef = useRef(null);
    const startPos = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const openApp = (appName) => {
        if (!openWindows.includes(appName)) {
            setOpenWindows([...openWindows, appName]);
        }
    };

    const closeApp = (appName) => {
        setOpenWindows(openWindows.filter((app) => app !== appName));
    };

    const handleMouseDown = (e) => {
        if (!desktopRef.current.contains(e.target) || e.target.closest(".icon")) return;
        startPos.current = { x: e.clientX, y: e.clientY };
        setSelectionBox({ x: e.clientX, y: e.clientY, width: 0, height: 0 });
    };

    const handleMouseMove = (e) => {
        if (!startPos.current) return;
        const newX = Math.min(e.clientX, startPos.current.x);
        const newY = Math.min(e.clientY, startPos.current.y);
        const newWidth = Math.abs(e.clientX - startPos.current.x);
        const newHeight = Math.abs(e.clientY - startPos.current.y);
        setSelectionBox({ x: newX, y: newY, width: newWidth, height: newHeight });
    };

    const handleMouseUp = () => {
        setSelectionBox(null);
        startPos.current = null;
    };

    return (
        <div
            className="custom-os"
            style={{
                backgroundImage: "url(/images/wallpaper.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
            }}
        >
            <div
                className="desktop"
                ref={desktopRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
            >
                <div className="icon" onDoubleClick={() => openApp("Projects")}>
                    <img src="/images/folder.png" alt="Projects" className="icon-image" />
                    <span className="icon-label">Projects</span>
                </div>
                <div className="icon" onDoubleClick={() => openApp("Notes")}>
                    <img src="/images/notepad.png" alt="Notes" className="icon-image" />
                    <span className="icon-label">Notes</span>
                </div>
                <div className="icon" onDoubleClick={() => openApp("AboutMe")}>
                    <img src="/images/folder.png" alt="About Me" className="icon-image" />
                    <span className="icon-label">AboutMe</span>
                </div>
                <div className="icon" onDoubleClick={() => openApp("MyPC")}>
                    <img src="/images/folder.png" alt="My PC" className="icon-image" />
                    <span className="icon-label">My PC</span>
                </div>
                <div className="icon" onDoubleClick={() => openApp("Musics")}>
                    <img src="/images/musics.png" alt="Musics" className="icon-image" />
                    <span className="icon-label">Musics</span>
                </div>
                {selectionBox && (
                    <div
                        className="selection-box"
                        style={{
                            left: selectionBox.x,
                            top: selectionBox.y,
                            width: selectionBox.width,
                            height: selectionBox.height,
                            position: "absolute",
                            background: "rgba(0, 120, 215, 0.3)",
                            border: "1px solid rgba(0, 120, 215, 0.8)",
                        }}
                    ></div>
                )}
            </div>

            {openWindows.includes("Explorer") && (
                <div className="window">
                    <div className="window-header">
                        Files <button onClick={() => closeApp("Explorer")}>X</button>
                    </div>
                    <div className="window-content">File manager...</div>
                </div>
            )}
            {openWindows.includes("Notes") && (
                <div className="window">
                    <div className="window-header">
                        Notes <button onClick={() => closeApp("Notes")}>X</button>
                    </div>
                    <textarea className="window-content" placeholder="Type something..."></textarea>
                </div>
            )}
            {openWindows.includes("Terminal") && (
                <div className="window">
                    <div className="window-header">
                        Terminal <button onClick={() => closeApp("Terminal")}>X</button>
                    </div>
                    <div className="window-content">Fake terminal running...</div>
                </div>
            )}

            <div className="taskbar">
                <div className="start-button" onClick={toggleMenu}>⚙️</div>
                <div className="taskbar-search">
                    <input type="text" placeholder="Pesquisar..." />
                </div>
                <div className="taskbar-time">{time.toLocaleTimeString()}</div>
            </div>

            {showMenu && (
                <div className="start-menu">
                    <div className="start-item" onClick={() => alert('Abrindo Configurações...')}>⚙️ Configurações</div>
                    <div className="start-item" onClick={() => alert('Desligando...')}>🔌 Desligar</div>
                </div>
            )}
            )
        </div>
    );
};

export default OS;
