import React from 'react';
import {NavLink} from "react-router-dom";

const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="container">
                <div className="header__inner">
                    <NavLink className="header__link" to="/contact">Контакты</NavLink>
                    <NavLink className="header__link" to="/create-contact">Создать контакт</NavLink>
                </div>
            </div>
        </header>
    );
}

export default Header
