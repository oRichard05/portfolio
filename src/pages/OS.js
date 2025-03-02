import { useState, useEffect, useRef } from "react";
import "../styles/OS.css";
import "../styles/Taskbar.css";
import "../styles/AppIcon.css";
import "../styles/Window.css";
import Taskbar from "../components/Taskbar";
import AppIcon from "../components/AppIcon";
import Window from "../components/Window";

const OS = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [time, setTime] = useState(new Date());
    const [openWindows, setOpenWindows] = useState([]);
    const [selectionBox, setSelectionBox] = useState(null);
    const desktopRef = useRef(null);
    const menuRef = useRef(null);
    const startButtonRef = useRef(null);
    const startPos = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    // Fecha o menu quando clicar fora dele
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                menuRef.current && !menuRef.current.contains(event.target) &&
                startButtonRef.current && !startButtonRef.current.contains(event.target)
            ) {
                setShowMenu(false);
            }
        };

        if (showMenu) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showMenu]);

    const toggleMenu = () => setShowMenu(!showMenu);

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
        <div className="custom-os" style={{
            backgroundImage: "url(/images/wallpaper.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
        }}>
            <div className="desktop" ref={desktopRef} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
                <AppIcon name="Projects" image="/images/folder.png" onDoubleClick={() => openApp("Projects")} />
                <AppIcon name="Notes" image="/images/notepad.png" onDoubleClick={() => openApp("Notes")} />
                <AppIcon name="About Me" image="/images/folder.png" onDoubleClick={() => openApp("AboutMe")} />
                <AppIcon name="Contacts" image="/images/folder.png" onDoubleClick={() => openApp("Contacts")} />
                <AppIcon name="Musics" image="/images/musics.png" onDoubleClick={() => openApp("Musics")} />
                <AppIcon name="My PC" image="/images/mypc.png" onDoubleClick={() => openApp("My PC")} />
                {selectionBox && (
                    <div className="selection-box" style={{
                        left: selectionBox.x,
                        top: selectionBox.y,
                        width: selectionBox.width,
                        height: selectionBox.height,
                        position: "absolute",
                        background: "rgba(0, 120, 215, 0.3)",
                        border: "1px solid rgba(0, 120, 215, 0.8)"
                    }}></div>
                )}
            </div>

            {openWindows.includes("Explorer") && <Window title="Files" onClose={() => closeApp("Explorer")}><div>File manager...</div></Window>}
            {openWindows.includes("Notes") && <Window title="Notes" onClose={() => closeApp("Notes")}><textarea placeholder="Type something..."></textarea></Window>}
            {openWindows.includes("Terminal") && <Window title="Terminal" onClose={() => closeApp("Terminal")}><div>Fake terminal running...</div></Window>}

            <Taskbar time={time} apps={["Projects", "Notes", "About Me", "Contacts", "Musics"]} />

            {showMenu && (
                <div ref={menuRef} className="start-menu">
                    <div className="start-item" onClick={() => alert('Abrindo Configurações...')}>⚙️ Configurações</div>
                    <div className="start-item" onClick={() => alert('Desligando...')}>🔌 Desligar</div>
                </div>
            )}
        </div>
    );
};

export default OS;
