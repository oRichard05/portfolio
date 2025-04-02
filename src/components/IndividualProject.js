import React, { useState, useEffect } from 'react';
import { FaTimes, FaGithub, FaCog } from 'react-icons/fa';
import '../styles/IndividualProject.css';

const IndividualProject = ({ project, closeProjectWindow, openWindows }) => {
    const [position, setPosition] = useState(project.position);
    const [dragging, setDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const handleMouseDown = (e) => {
        setDragging(true);
        setOffset({ x: e.clientX - position.x, y: e.clientY - position.y });
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

    useEffect(() => {
        if (dragging) {
            project.zIndex = Math.max(...openWindows.map(win => win.zIndex)) + 1;
        }
    }, [dragging, openWindows]);

    return (
        <div className="window project-document" style={{ top: position.y, left: position.x, zIndex: project.zIndex }}>
            <div className="window-header" onMouseDown={handleMouseDown}>
                <span>{project.name}</span>
                <button onClick={() => closeProjectWindow(project.id)} className="close-btn"><FaTimes /></button>
            </div>
            <div className="window-content">
                <div className="project-description">
                    <p>{project.description}</p>
                </div>
                <div className="project-info">
                    <div className="info-item">
                        <FaCog className="info-icon" />
                        <p><strong>Tech Stack:</strong> {project.tech}</p>
                    </div>
                    <div className="info-item">
                        <FaGithub className="info-icon" />
                        <a href={project.link} target="_blank" rel="noopener noreferrer">View on GitHub</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IndividualProject;
