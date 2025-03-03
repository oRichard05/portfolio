import { useState, useEffect } from "react";
import "../styles/Projects.css";

const Projects = () => {
    const [projectWindows, setProjectWindows] = useState({});
    const [windowPositions, setWindowPositions] = useState({});
    const [zIndexTracker, setZIndexTracker] = useState({});
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [currentDrag, setCurrentDrag] = useState(null);

    const projects = [
        { id: "project1", name: "Projeto 1", description: "Descrição do Projeto 1", link: "https://github.com/projeto1" },
        { id: "project2", name: "Projeto 2", description: "Descrição do Projeto 2", link: "https://github.com/projeto2" },
        { id: "project3", name: "Projeto 3", description: "Descrição do Projeto 3", link: "https://github.com/projeto3" },
        { id: "project4", name: "Projeto 4", description: "Descrição do Projeto 4", link: "https://github.com/projeto4" },
        { id: "project5", name: "Projeto 5", description: "Descrição do Projeto 5", link: "https://github.com/projeto5" },
        { id: "project6", name: "Projeto 6", description: "Descrição do Projeto 6", link: "https://github.com/projeto6" }
    ];

    const bringToFront = (appName) => {
        setZIndexTracker((prev) => {
            const maxZIndex = Object.values(prev).length > 0 ? Math.max(...Object.values(prev)) : 0;
            return { ...prev, [appName]: maxZIndex + 1 };
        });
    };

    const handleMouseDown = (e, appName) => {
        bringToFront(appName);
        setIsDragging(true);
        setCurrentDrag(appName);

        // Corrigir o cálculo do offset
        const rect = e.currentTarget.closest(".project-window").getBoundingClientRect();
        setDragOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });

        // Prevenir comportamento indesejado no navegador
        e.preventDefault();
    };

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!isDragging || !currentDrag) return;

            setWindowPositions((prev) => ({
                ...prev,
                [currentDrag]: {
                    x: e.clientX - dragOffset.x,
                    y: e.clientY - dragOffset.y,
                }
            }));
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            setCurrentDrag(null);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging, currentDrag, dragOffset]);
    const getDefaultPosition = () => ({
        x: window.innerWidth / 2 - 200,
        y: window.innerHeight / 2 - 150
    });

    return (
        <div className="projects-container">
            <div className="projects-window">
                <div className="window-header">
                    Meus Projetos
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

            {projects.map((project) =>
                projectWindows[project.id] ? (
                    <div
                        key={project.id}
                        className="project-window"
                        style={{
                            top: windowPositions[project.id]?.y ?? window.innerHeight / 2 - 150,
                            left: windowPositions[project.id]?.x ?? window.innerWidth / 2 - 200,
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
        </div>
    );
};

export default Projects;
