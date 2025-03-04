import { useState, useEffect, useRef } from "react";
import "../styles/OS.css";
import "../styles/Taskbar.css";
import Taskbar from "../components/Taskbar";
import AboutMe from "../components/AboutMe";
import Contacts from "../components/Contacts";
import MyPC from "../components/MyPC";
import Projects from "../components/Projects";
import AppIcon from "../components/AppIcon";

const OS = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [time, setTime] = useState(new Date());
    const [openWindows, setOpenWindows] = useState([]);
    const [windowsPositions, setWindowsPositions] = useState({});
    const [zIndexTracker, setZIndexTracker] = useState({});
    const desktopRef = useRef(null);
    const menuRef = useRef(null);
    const startButtonRef = useRef(null);
    const windowsRef = useRef({});

    useEffect(() => {
        const interval = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                menuRef.current && !menuRef.current.contains(event.target) &&
                startButtonRef.current && !startButtonRef.current.contains(event.target)
            ) {
                setShowMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleMenu = () => setShowMenu(!showMenu);

    const openApp = (appName) => {
        if (!openWindows.includes(appName)) {
            setOpenWindows([...openWindows, appName]);
            setWindowsPositions(prev => ({
                ...prev,
                [appName]: { x: 100 + openWindows.length * 30, y: 100 + openWindows.length * 30 }
            }));
            setZIndexTracker(prev => ({
                ...prev,
                [appName]: Object.keys(prev).length + 1
            }));
        } else {
            bringToFront(appName);
        }
    };

    const closeApp = (appName) => {
        setOpenWindows(openWindows.filter((app) => app !== appName));
    };

    const bringToFront = (appName) => {
        setZIndexTracker(prev => ({
            ...prev,
            [appName]: Math.max(...Object.values(prev)) + 1
        }));
    };

    const handleDrag = (appName, e) => {
        e.preventDefault();
        bringToFront(appName);

        let startX = e.clientX;
        let startY = e.clientY;

        const moveWindow = (event) => {
            const dx = event.clientX - startX;
            const dy = event.clientY - startY;
            setWindowsPositions(prev => ({
                ...prev,
                [appName]: {
                    x: prev[appName].x + dx,
                    y: prev[appName].y + dy
                }
            }));
            startX = event.clientX;
            startY = event.clientY;
        };

        const stopMove = () => {
            document.removeEventListener("mousemove", moveWindow);
            document.removeEventListener("mouseup", stopMove);
        };

        document.addEventListener("mousemove", moveWindow);
        document.addEventListener("mouseup", stopMove);
    };

    const renderWindow = (appName) => {
        const WindowComponent = {
            "Projects": Projects,  // <- Certifique-se de que "Projects" está corretamente listado
            "AboutMe": AboutMe,
            "Contacts": Contacts,
            "MyPC": MyPC,
        }[appName];

        if (!WindowComponent) return null; // Evita erro caso appName não esteja listado

        return (
            <div
                key={appName}
                ref={(el) => (windowsRef.current[appName] = el)}
                className="window"
                style={{
                    position: "absolute",
                    top: windowsPositions[appName]?.y || 100,
                    left: windowsPositions[appName]?.x || 100,
                    zIndex: zIndexTracker[appName] || 1,
                }}
                onMouseDown={() => bringToFront(appName)}
            >
                <div className="window-header" onMouseDown={(e) => handleDrag(appName, e)}>
                    <span>{appName}</span>
                    <button onClick={() => closeApp(appName)}>X</button>
                </div>
                <WindowComponent closeApp={() => closeApp(appName)} />
            </div>
        );
    };

    return (
        <div className="custom-os" style={{
            backgroundImage: "url(/images/wallpaper.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
        }}>
            <div className="desktop" ref={desktopRef}>
                <AppIcon name="Projects" image="/images/folder.png" onDoubleClick={() => openApp("Projects")} />
                <AppIcon name="AboutMe" image="/images/folder.png" onDoubleClick={() => openApp("AboutMe")} />
                <AppIcon name="Contacts" image="/images/folder.png" onDoubleClick={() => openApp("Contacts")} />
                <AppIcon name="MyPC" image="/images/mypc.png" onDoubleClick={() => openApp("MyPC")} />
            </div>

            <Taskbar time={time} openApp={openApp} />

            {showMenu && (
                <div ref={menuRef} className="start-menu">
                    <div className="start-item" onClick={() => alert('Abrindo Configurações...')}>⚙ Configurações</div>
                    <div className="start-item" onClick={() => alert('Desligando...')}> Desligar</div>
                </div>
            )}

            {openWindows.map((window) => renderWindow(window))}
        </div>
    );
};

export default OS;
