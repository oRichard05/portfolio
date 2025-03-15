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
    const [openWindows, setOpenWindows] = useState([]); // Only tracks which apps are open

    const desktopRef = useRef(null);
    const menuRef = useRef(null);
    const startButtonRef = useRef(null);

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

    // Opens the app by tracking its name
    const openApp = (appName) => {
        if (!openWindows.includes(appName)) {
            setOpenWindows([...openWindows, appName]);
        }
    };

    // Closes the app by removing it from state
    const closeApp = (appName) => {
        setOpenWindows(openWindows.filter((app) => app !== appName));
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

            {/* Render each app component if it's open */}
            {openWindows.includes("Projects") && <Projects closeApp={() => closeApp("Projects")} />}
            {openWindows.includes("AboutMe") && <AboutMe closeApp={() => closeApp("AboutMe")} />}
            {openWindows.includes("Contacts") && <Contacts closeApp={() => closeApp("Contacts")} />}
            {openWindows.includes("MyPC") && <MyPC closeApp={() => closeApp("MyPC")} />}
        </div>
    );
};

export default OS;
