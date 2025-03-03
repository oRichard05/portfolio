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
        { id: "project1", name: "Pe-na-moda", description: "An online clothing store website.", link: "https://github.com/oRichard05/PeNaModa" },
        { id: "project2", name: "Earte", description: "An art store website.", link: "https://github.com/oRichard05/Earte" },
        { id: "project3", name: "Pokedex", description: "A frontend website simulating a Pokédex.", link: "https://github.com/oRichard05/Pokedex" },
        { id: "project4", name: "Juros", description: "A frontend interest rate calculator.", link: "https://github.com/oRichard05/juros" },
        { id: "project5", name: "Edu-Planner", description: "A school management website.", link: "https://github.com/oRichard05/EduPlanner" },
        { id: "project6", name: "Biriguizinho", description: "Line-following Arduino robot code.", link: "https://github.com/oRichard05/Biriguizinho" }
    ];

    const bringToFront = (appName) => {
        setZIndexTracker(prev => {
            const maxZ = Math.max(1, ...Object.values(prev));
            return { ...prev, [appName]: maxZ + 1 };
        });
    };

    const handleMouseDown = (e, appName) => {
        bringToFront(appName);
        setIsDragging(true);
        setCurrentDrag(appName);

        const rect = e.currentTarget.closest(".project-window").getBoundingClientRect();
        setDragOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });

        e.preventDefault();
    };

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!isDragging || !currentDrag) return;

            setWindowPositions(prev => ({
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

    return (
        <div className="projects-container">
            <div className="projects-window">
                <div className="window-content">
                    {projects.map(project => (
                        <div
                            key={project.id}
                            className="text-file"
                            onClick={() => setProjectWindows(prev => ({ ...prev, [project.id]: true }))}
                        >
                            {project.name}
                        </div>
                    ))}
                </div>
            </div>

            {projects.map(project =>
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
                            <button className="close-btn" onClick={() => setProjectWindows(prev => ({ ...prev, [project.id]: false }))}>✖</button>
                        </div>
                        <div className="window-content">
                            <p>{project.description}</p>
                            <a href={project.link} target="_blank" rel="noopener noreferrer">View on GitHub</a>
                        </div>
                    </div>
                ) : null
            )}
        </div>
    );
};

export default Projects;
