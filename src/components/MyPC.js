import React, { useState, useEffect } from 'react';
import '../styles/MyPC.css';
import { FaTimes } from 'react-icons/fa';

const pcIcon = '/images/mypc.png';

const MyPC = ({ closeApp }) => {
    const [position, setPosition] = useState({ x: 200, y: 200 });
    const [dragging, setDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [zIndex, setZIndex] = useState(1);

    const handleMouseDown = (e) => {
        setDragging(true);
        setOffset({ x: e.clientX - position.x, y: e.clientY - position.y });
        setZIndex(prevZIndex => prevZIndex + 1);
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
        <div className="my-pc-window" style={{ top: position.y, left: position.x, zIndex: zIndex }}>
            <div className="my-pc-window-header" onMouseDown={handleMouseDown}>
                <span>System Information</span>
                <button onClick={closeApp} className="close-btn"><FaTimes /></button>
            </div>
            <div className="window-mypc-content">
                <div className="pc-icon" style={{ backgroundImage: `url(${pcIcon})` }}></div>
                <div className="pc-title">System Information</div>
                <div className="pc-specs">
                    <p><strong>Device Name:</strong> MacBook Pro 2023</p>
                    <p><strong>Operating System:</strong> macOS 14 Sonoma</p>
                    <p><strong>Processor:</strong> Apple M3 Pro Chip</p>
                    <p><strong>RAM:</strong> 32GB Unified Memory</p>
                    <p><strong>Storage:</strong> 1TB SSD</p>
                    <p><strong>Graphics:</strong> Apple GPU (16-core)</p>
                    <p><strong>Display:</strong> 14.2-inch Liquid Retina XDR</p>
                </div>
            </div>
        </div>
    );
};

export default MyPC;
