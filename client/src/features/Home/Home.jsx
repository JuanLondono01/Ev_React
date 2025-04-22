import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@/features/Global/Navbar.jsx';
import Footer from '@/features/Global/Footer.jsx';

function Home() {
    return (
        <>
            <Navbar/>
            <Outlet />
            <Footer />

        </>
    );
}

export default Home;
