import React from 'react';
import '../styles/Contacts.css';

const Contacts = () => {
    return (
        <div className="window contacts-window">
            <div className="window-content">
                <h2>Get in Touch</h2>
                <ul className="contact-list">
                    <li><strong>Email:</strong> <a href="mailto:otonirichard@icloud.com">otonirichard@icloud.com</a></li>
                    <li><strong>Phone:</strong> <a href="tel:+19199237355">+1 (919) 923-7355</a></li>
                    <li><strong>GitHub:</strong> <a href="https://github.com/oRichard05" target="_blank" rel="noopener noreferrer">github.com/oRichard05</a></li>
                    <li><strong>Instagram:</strong> <a href="https://www.instagram.com/o.richard05/" target="_blank" rel="noopener noreferrer">@o.richard05</a></li>
                </ul>
            </div>
        </div>
    );
};

export default Contacts;
