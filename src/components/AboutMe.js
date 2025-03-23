import React, { useState, useEffect } from 'react';
import '../styles/AboutMe.css';
import {FaTimes} from "react-icons/fa";

const AboutMe = ({ closeApp }) => {
    const [position, setPosition] = useState({ x: 100, y: 100 });
    const [dragging, setDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [zIndex, setZIndex] = useState(1);

    const handleMouseDown = (e) => {
        setDragging(true);
        setOffset({ x: e.clientX - position.x, y: e.clientY - position.y });
        bringToFront();
    };

    const handleMouseMove = (e) => {
        if (!dragging) return;
        setPosition({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    };

    const handleMouseUp = () => {
        setDragging(false);
    };

    const bringToFront = () => {
        setZIndex(prevZIndex => prevZIndex + 1); // Increase zIndex to bring window to the front
    };

    // Handle dragging logic on mouse events
    useEffect(() => {
        const handleMouseMoveListener = (e) => handleMouseMove(e);
        const handleMouseUpListener = () => handleMouseUp();

        if (dragging) {
            document.addEventListener('mousemove', handleMouseMoveListener);
            document.addEventListener('mouseup', handleMouseUpListener);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMoveListener);
            document.removeEventListener('mouseup', handleMouseUpListener);
        };
    }, [dragging, offset]);

    return (
        <div
            className="window about-me-window"
            style={{
                top: position.y,
                left: position.x,
                zIndex: zIndex, // Control the stacking order
            }}
            onMouseMove={handleMouseMove}
        >
            <div
                className="window-about-me-header"
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
            >
                <span>About Me</span>
                <button onClick={closeApp} className="close-btn"><FaTimes /></button>
            </div>
            <div className="window-about-me-content">
                <div className="about-header">
                    <img src="/images/Foto2.png" alt="Richard Picture" className="about-profile-image" />
                    <div className="about-text">
                        <h2>Otoni Richard</h2>
                        <p>
                            I am a Brazilian student pursuing a double major in
                            Computer Science and Economics at UNC Chapel Hill.
                            My passion for technology began in high school, during the pandemic,
                            when I started learning to program and build websites.
                        </p>
                    </div>
                </div>

                <div className="about-body">
                    <p>
                        In 2022 and 2023, I joined my school's robotics team, developing a line-following robot
                        and competing in the Brazilian Robotics Olympiad (OBR). Our team won regional, state,
                        and national titles in the Best Programming category.
                    </p>
                    <div className="about-image-group">
                        <img src="/images/foto1.png" alt="Competition" className="about-image" />
                        <img src="/images/robotica.png" alt="Robotics Team" className="about-image" />
                    </div>

                    <p>
                        Beyond robotics, I have participated in several state and national programming and math competitions.
                        In 2023, I was selected among 20 students from São Paulo to receive a full scholarship
                        covering all expenses for four years of college in the United States.
                    </p>
                    <p>
                        I am eager to apply my knowledge and skills in technology to real-world challenges.
                        I am particularly interested in web development, software engineering, and data science.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutMe;
