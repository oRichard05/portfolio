import React from 'react';
import '../styles/Contacts.css';

const Contacts = () => {
    return (
        <div className="contacts-window">
            <h2>Contatos</h2>
            <ul>
                <li>Email: exemplo@dominio.com</li>
                <li>LinkedIn: linkedin.com/in/exemplo</li>
                <li>GitHub: github.com/exemplo</li>
            </ul>
            <p>Fique à vontade para entrar em contato comigo através de qualquer um desses meios!</p>
        </div>
    );
};

export default Contacts;
