import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import '../styles/Contacts.css';

const Contacts = ({ closeApp }) => {
    const [position, setPosition] = useState({ x: 200, y: 200 });
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

    return (
        <div
            className="window contacts-window"
            style={{ top: position.y, left: position.x }}
        >
            <div className="window-contacts-header" onMouseDown={handleMouseDown}>
                <span>Get in Touch</span>
                <button onClick={closeApp} className="close-contacts-btn">
                    <FaTimes />
                </button>
            </div>
            <div className="window-contacts-content">
                <ul className="contact-list">
                    <li><strong>Email:</strong> <a href="mailto:otonirichard@icloud.com">otonirichard@icloud.com</a></li>
                    <li><strong>Phone:</strong> <a href="tel:+19199237355">+1 (919) 923-7355</a></li>
                    <li><strong>GitHub:</strong> <a href="https://github.com/oRichard05" target="_blank" rel="noopener noreferrer">github.com/oRichard05</a></li>
                    <li><strong>Instagram:</strong> <a href="https://www.instagram.com/o.richard05/" target="_blank" rel="noopener noreferrer">@o.richard05</a></li>
                </ul>
            </div>
        </div>
    );
};

export default Contacts;
