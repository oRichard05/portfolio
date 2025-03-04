import React from 'react';
import '../styles/MyPC.css';

const MyPC = () => {
    return (
        <div className="window my-pc-window">
            <div className="window-content">
                <ul className="pc-specs">
                    <li><strong>Device Name:</strong> Richard's Computer</li>
                    <li><strong>Operating System:</strong> Windows 11</li>
                    <li><strong>Processor:</strong> Intel i7</li>
                    <li><strong>RAM:</strong> 16GB</li>
                    <li><strong>Storage:</strong> 512GB SSD</li>
                    <li><strong>Graphics Card:</strong> NVIDIA GTX 1660</li>
                    <li><strong>Screen Resolution:</strong> 1920x1080</li>
                    <li><strong>System Type:</strong> 64-bit Operating System</li>
                    <li><strong>BIOS Version:</strong> American Megatrends 5.21</li>
                </ul>
            </div>
        </div>
    );
};

export default MyPC;
