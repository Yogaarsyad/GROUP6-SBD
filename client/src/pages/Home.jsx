import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import Navbar from '../components/Navbar';

function Home() {
    const navigate = useNavigate();


    return (
        <div className="min-h-screen bg-custom-background">
            <Navbar></Navbar>
            <div className='text-white h-50 absolute top-1/2 left-1/2'>Coming soon..</div>
        </div>
    );
}

export default PageTransition(Home)