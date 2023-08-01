import React from 'react';
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const MainLayout: React.FC = () => {
    return (
        <React.Fragment>
            <Header/>
            <Outlet />
        </React.Fragment>
    );
}

export default MainLayout
