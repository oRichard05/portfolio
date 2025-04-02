import React, { useState, useEffect } from 'react';
import '../styles/Projects.css';
import { FaTimes } from 'react-icons/fa';
import IndividualProject from './IndividualProject';

const Projects = ({ closeApp }) => {
    const [position, setPosition] = useState({ x: 150, y: 150 });
    const [dragging, setDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [zIndex, setZIndex] = useState(1);
    const [openWindows, setOpenWindows] = useState([]);

    const handleMouseDown = (e) => {
        setDragging(true);
        setOffset({ x: e.clientX - position.x, y: e.clientY - position.y });
        setZIndex(prevZIndex => prevZIndex + 1); // Move the dragged window to the top
    };

    const handleMouseMove = (e) => {
        if (!dragging) return;
        setPosition({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    };

    const handleMouseUp = () => {
        setDragging(false);
    };

    useEffect(() => {
        if (dragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        } else {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        }
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [dragging]);

    const projects = [
        {
            id: "project1",
            name: "Pe-na-moda",
            description: "Online clothing store. It functions as a fully editable virtual storefront, allowing you to add, edit, or delete products.",
            tech: "HTML, CSS, JavaScript",
            link: "https://github.com/oRichard05/PeNaModa.git"
        },
        {
            id: "project2",
            name: "Earte",
            description: "Art store website. It represents a landing page for a store selling art products, focusing on branding and alignment with the target audience.",
            tech: "HTML, CSS, JavaScript",
            link: "https://github.com/oRichard05/Earte.git"
        },
        {
            id: "project3",
            name: "Pokedex",
            description: "Pokédex simulation website using an external API to track Pokémon. A true demonstration of the power of APIs and frontend integration.",
            tech: "HTML, CSS, JavaScript",
            link: "https://github.com/oRichard05/Pokedex.git"
        },
        {
            id: "project4",
            name: "Juros",
            description: "Interest rate calculator. It calculates simple and compound interest, helping users with financial planning.",
            tech: "HTML, CSS, JavaScript",
            link: "https://github.com/oRichard05/juros.git"
        },
        {
            id: "project5",
            name: "Edu-Planner",
            description: "School management platform built with Flask, Python, and MySQL. It includes features like student scheduling and appointments.",
            tech: "Python-Flask, MySQL",
            link: "https://github.com/oRichard05/EduPlanner.git"
        },
        {
            id: "project6",
            name: "Biriguizinho",
            description: "Line-following Arduino robot built with C++ and Arduino. A fun project focused on robotics and automation.",
            tech: "C++, Arduino",
            link: "https://github.com/oRichard05/Biriguizinho.git"
        },
    ];

    const openProjectWindow = (project) => {
        const centerX = window.innerWidth / 2 - 200;
        const centerY = window.innerHeight / 2 - 150;
        setOpenWindows(prevWindows => [
            ...prevWindows,
            { ...project, position: { x: centerX, y: centerY }, zIndex: prevWindows.length + 1, dragging: false }
        ]);
    };

    const closeProjectWindow = (id) => {
        setOpenWindows(openWindows.filter(win => win.id !== id));
    };

    return (
        <>
            <div className="window projects-window" style={{ top: position.y, left: position.x, zIndex: zIndex }}>
                <div className="window-projects-header" onMouseDown={handleMouseDown}>
                    <span>Projects</span>
                    <button onClick={closeApp} className="close-btn"><FaTimes /></button>
                </div>
                <div className="window-projects-content">
                    {projects.map((project) => (
                        <div key={project.id} className="folder" onClick={() => openProjectWindow(project)}>
                            📁 {project.name}
                        </div>
                    ))}
                </div>
            </div>

            {openWindows.map((project) => (
                <IndividualProject
                    key={project.id}
                    project={project}
                    closeProjectWindow={closeProjectWindow}
                    openWindows={openWindows}
                />
            ))}
        </>
    );
};

export default Projects;
