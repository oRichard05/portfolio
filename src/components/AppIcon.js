const AppIcon = ({ name, image, onDoubleClick }) => {
    return (
        <div className="icon" onDoubleClick={onDoubleClick}>
            <img src={image} alt={name} className="icon-image" />
            <span className="icon-label">{name}</span>
        </div>
    );
};

export default AppIcon;
