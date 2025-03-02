const Window = ({ title, onClose, children }) => {
    return (
        <div className="window">
            <div className="window-header">
                {title} <button onClick={onClose}>X</button>
            </div>
            <div className="window-content">{children}</div>
        </div>
    );
};

export default Window;
