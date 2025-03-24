import React, { useState, useEffect } from 'react';
import '../styles/AboutMe.css';
import { FaTimes } from "react-icons/fa";

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
                            I’m a Brazilian student currently studying Computer Science and Economics at UNC Chapel Hill. I grew up in the interior of São Paulo, Brazil, and my interest in technology and programming started back in high school, right around the time the pandemic hit.
                        </p>
                    </div>
                </div>

                <div className="about-body">
                    <p>
                        As a kid, I was always competitive, which led me to get involved in football and judo. Through those experiences, I learned a lot about teamwork, discipline, and perseverance                    </p>
                    <p>
                        In high school, I decided to take my love for programming and mix it with my competitive side. I became the captain of my school’s robotics team, where we built an autonomous robot that could follow lines and rescue victims. We ended up winning regional, state, and national championships at the Brazilian Robotics Olympiad (OBR), which was an amazing experience.                    </p>

                    <div className="about-image-group">
                        <img src="/images/foto1.png" alt="Competition" className="about-image" />
                        <img src="/images/robotica.png" alt="Robotics Team" className="about-image" />
                    </div>

                    <p>
                        Along the way, I also participated in a bunch of math and programming competitions, especially in my senior year. Those challenges helped me sharpen my problem-solving skills and strengthened my passion for technology.
                    </p>

                    <p>
                        Outside of school, I worked at my uncle’s store during my final year of middle school and throughout high school summers. I helped with sales and inventory, which taught me a lot about organization and communication
                    </p>

                    <p>
                        Now, as I continue my studies, I’m excited to dive deeper into web development and software engineering. I’m focused on growing my knowledge in the tech field, especially with tools like C/C++, Python, JavaScript, HTML, CSS, React, and Figma.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutMe;
