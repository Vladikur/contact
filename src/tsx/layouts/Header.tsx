import React from 'react';
import {NavLink} from "react-router-dom";
import {useAppDispatch} from "../../hook";
import {logoutUser} from "../../store/userReducer";

const Header: React.FC = () => {
    const dispatch = useAppDispatch()

    const logOut = () => {
        // @ts-ignore
        dispatch(logoutUser())
    }

    return (
        <header className="header">
            <div className="container">
                <div className="header__inner">
                    <NavLink className="header__link" to="/contact">Контакты</NavLink>
                    <NavLink className="header__link" to="/create-contact">Создать контакт</NavLink>
                    <button type="button" onClick={logOut} className="btn _accent">Выйти</button>
                </div>
            </div>
        </header>
    );
}

export default Header
