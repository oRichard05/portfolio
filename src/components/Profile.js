import React from 'react';
import '../styles/Profile.css';

const Profile = () => {
    return (
        <div className="profile-window">
            <h2>Perfil</h2>
            <div className="profile-info">
                <img src="/images/profile-pic.jpg" alt="Profile" className="profile-pic" />
                <p>Nome: João Silva</p>
                <p>Cargo: Desenvolvedor Front-end</p>
                <p>Localização: São Paulo, Brasil</p>
            </div>
        </div>
    );
};

export default Profile;
