import React, { useEffect, useState } from 'react';
import '../styles/ShutDownEffect.css';

const ShutdownEffect = ({ onComplete }) => {
    const [opacity, setOpacity] = useState(1);  // Começa com a tela visível

    useEffect(() => {
        const interval = setInterval(() => {
            setOpacity((prev) => {
                if (prev <= 0) {
                    clearInterval(interval);
                    onComplete();  // Chama o callback quando o efeito acabar
                    return 0;
                }
                return prev - 0.05;  // Reduz a opacidade
            });
        }, 100);

        return () => clearInterval(interval);  // Limpa o intervalo
    }, [onComplete]);

    return (
        <div className="shutdown-screen" style={{ backgroundColor: `rgba(0, 0, 0, ${1 - opacity})` }} />
    );
};

export default ShutdownEffect;
