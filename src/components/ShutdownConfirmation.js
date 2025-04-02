import React from 'react';
import '../styles/Shutdown.css';

const ShutdownConfirmation = ({ onCancel, onShutdown }) => {
    return (
        <div className="shutdown-overlay">
            <div className="shutdown-modal">
                {/* Barra de título estilo macOS */}
                <div className="shutdown-header">
                    <span>Shut Down</span>
                </div>

                {/* Corpo da mensagem */}
                <div className="shutdown-body">
                    <p className="shutdown-text">Are you sure you want to shut down?</p>
                </div>

                {/* Botões */}
                <div className="shutdown-buttons">
                    <button className="cancel-btn" onClick={onCancel}>Cancel</button>
                    <button className="shutdown-btn" onClick={onShutdown}>Shut Down</button>
                </div>
            </div>
        </div>
    );
};

export default ShutdownConfirmation;
