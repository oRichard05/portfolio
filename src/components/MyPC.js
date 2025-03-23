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

    const handleClickOutside = (e) => {
        if (!e.target.closest('.my-pc-window')) {
            closeApp();
        }
    };

    useEffect(() => {
        if (dragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        } else {
            document.addEventListener('click', handleClickOutside);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        }
        return () => {
            document.removeEventListener('click', handleClickOutside);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [dragging]);

    return (
        <div className="my-pc-window" style={{ top: position.y, left: position.x, zIndex: zIndex }}>
            <div className="window-header" onMouseDown={handleMouseDown}>
                <span>My PC</span>
                <button onClick={closeApp} className="close-btn"><FaTimes /></button>
            </div>
            <div className="window-mypc-content">
                <div className="pc-icon" style={{ backgroundImage: `url(${pcIcon})` }}></div>
                <div className="pc-title">System Information</div>
                <div className="pc-specs">
                    <p><strong>Device Name:</strong> Richard's Computer</p>
                    <p><strong>Operating System:</strong> Windows 11</p>
                    <p><strong>Processor:</strong> Intel i7</p>
                    <p><strong>RAM:</strong> 16GB</p>
                    <p><strong>Storage:</strong> 512GB SSD</p>
                    <p><strong>Graphics Card:</strong> NVIDIA GTX 1660</p>
                    <p><strong>Screen Resolution:</strong> 1920x1080</p>
                    <p><strong>System Type:</strong> 64-bit Operating System</p>
                    <p><strong>BIOS Version:</strong> American Megatrends 5.21</p>
                </div>
            </div>
        </div>
    );
};

export default MyPC;