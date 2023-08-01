import React from 'react';
import {NavLink} from "react-router-dom";

const PageNotFound:React.FC  = () => {
    return (
        <main>
            <div className="container">
                <div className="page-not-found">
                    <h1>404</h1>
                    <NavLink to="/">На главную</NavLink>
                </div>
            </div>
        </main>
    );
}

export default PageNotFound;
