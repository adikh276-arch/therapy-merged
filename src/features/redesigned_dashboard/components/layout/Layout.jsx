import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = () => {
    return (
        <div className="layout">
            <Sidebar />
            <Header />
            <main className="page-container">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
