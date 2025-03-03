import { useState, useEffect } from "react";
import "../styles/Projects.css";

const Projects = () => {
    const [openWindows, setOpenWindows] = useState({ projectsFolder: false });
    const [projectWindows, setProjectWindows] = useState({});
    const [windowPositions, setWindowPositions] = useState({});
    const [zIndexTracker, setZIndexTracker] = useState({});
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [currentDrag, setCurrentDrag] = useState(null);
    const [currentTime, setCurrentTime] = useState(
        new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );

    const projects = [
        { id: "project1", name: "Projeto 1", description: "Descrição do Projeto 1", link: "https://github.com/projeto1" },
        { id: "project2", name: "Projeto 2", description: "Descrição do Projeto 2", link: "https://github.com/projeto2" },
        { id: "project3", name: "Projeto 3", description: "Descrição do Projeto 3", link: "https://github.com/projeto3" },
        { id: "project4", name: "Projeto 4", description: "Descrição do Projeto 4", link: "https://github.com/projeto4" },
        { id: "project5", name: "Projeto 5", description: "Descrição do Projeto 5", link: "https://github.com/projeto5" },
        { id: "project6", name: "Projeto 6", description: "Descrição do Projeto 6", link: "https://github.com/projeto6" }
    ];

    useEffect(() => {
        const updateClock = () => {
            setCurrentTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
        };

        const clockInterval = setInterval(updateClock, 60000);
        return () => clearInterval(clockInterval);
    }, []);

    const bringToFront = (appName) => {
        setZIndexTracker((prev) => ({
            ...prev,
            [appName]: (Object.values(prev).length > 0 ? Math.max(...Object.values(prev)) : 0) + 1,
        }));
    };

    const handleMouseDown = (e, appName) => {
        bringToFront(appName);
        setIsDragging(true);
        setCurrentDrag(appName);
        const rect = e.currentTarget.getBoundingClientRect();
        setDragOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleMouseMove = (e) => {
        if (!isDragging || !currentDrag) return;
        setWindowPositions((prev) => ({
            ...prev,
            [currentDrag]: {
                x: Math.max(0, Math.min(window.innerWidth - 300, e.clientX - dragOffset.x)),
                y: Math.max(0, Math.min(window.innerHeight - 200, e.clientY - dragOffset.y))
            },
        }));
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setCurrentDrag(null);
    };

    useEffect(() => {
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging, currentDrag]);

    return (
        <div className="projects-container">
            <div className="folder" onClick={() => setOpenWindows((prev) => ({ ...prev, projectsFolder: true }))}>
                Meus Projetos
            </div>

            {openWindows.projectsFolder && (
                <div
                    className="projects-window"
                    style={{
                        top: windowPositions["projectsFolder"]?.y ?? 100,
                        left: windowPositions["projectsFolder"]?.x ?? 100,
                        zIndex: zIndexTracker["projectsFolder"] || 1,
                    }}
                    onMouseDown={(e) => handleMouseDown(e, "projectsFolder")}
                >
                    <div className="window-header">
                        Meus Projetos
                        <button onClick={() => setOpenWindows((prev) => ({ ...prev, projectsFolder: false }))}>Close</button>
                    </div>
                    <div className="window-content">
                        {projects.map((project) => (
                            <div
                                key={project.id}
                                className="text-file"
                                onClick={() => setProjectWindows((prev) => ({ ...prev, [project.id]: true }))}
                            >
                                {project.name}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {projects.map((project) =>
                projectWindows[project.id] ? (
                    <div
                        key={project.id}
                        className="project-window"
                        style={{
                            top: windowPositions[project.id]?.y ?? 150,
                            left: windowPositions[project.id]?.x ?? 150,
                            zIndex: zIndexTracker[project.id] || 1,
                        }}
                        onMouseDown={(e) => handleMouseDown(e, project.id)}
                    >
                        <div className="window-header">
                            {project.name}
                            <button onClick={() => setProjectWindows((prev) => ({ ...prev, [project.id]: false }))}>Close</button>
                        </div>
                        <div className="window-content">
                            <p>{project.description}</p>
                            <a href={project.link} target="_blank" rel="noopener noreferrer">Ver no GitHub</a>
                        </div>
                    </div>
                ) : null
            )}

            <div className="clock">{currentTime}</div>
        </div>
    );
};

export default Projects;