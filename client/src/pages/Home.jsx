import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import Navbar from '../components/Navbar';

function Home() {
    const navigate = useNavigate();


    return (
        <div className="min-h-screen bg-custom-background">
            <Navbar></Navbar>
        </div>
    );
}

export default PageTransition(Home)