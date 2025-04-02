import React, { useEffect, useState } from 'react';
import '../styles/Shutdown.css';

const ShutdownEffect = ({ onComplete }) => {
    const [opacity, setOpacity] = useState(1);

    useEffect(() => {
        const interval = setInterval(() => {
            setOpacity((prev) => Math.max(prev - 0.05, 0));
        }, 100);

        setTimeout(() => {
            clearInterval(interval);
            onComplete();
        }, 2000);

        return () => clearInterval(interval);
    }, [onComplete]);

    return <div className="shutdown-screen" style={{ opacity }} />;
};

export default ShutdownEffect;
