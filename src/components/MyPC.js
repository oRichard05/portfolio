import React from 'react';
import '../styles/MyPC.css';

const MyPC = () => {
    return (
        <div className="my-pc-window">
            <h2>Meu PC</h2>
            <ul>
                <li>Sistema Operacional: Windows 11</li>
                <li>Processador: Intel i7</li>
                <li>Memória RAM: 16GB</li>
                <li>Armazenamento: 512GB SSD</li>
            </ul>
            <p>Esses são os principais detalhes do meu computador!</p>
        </div>
    );
};

export default MyPC;
