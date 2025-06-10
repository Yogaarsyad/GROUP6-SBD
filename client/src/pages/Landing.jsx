import React, { useState, useEffect } from 'react';
import { ChevronRight, Star, Zap, Shield, Users, ArrowRight, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import PageTransition from '../components/PageTransition';
import Navbar from '../components/Navbar';

function LandingPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-custom-background">
            <Navbar />
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 mb-32">
                <div className="max-w-7xl mx-auto text-center mt-20">
                    <div className="relative">
                        <h1 className="text-5xl md:text-7xl font-bold font-spectral mb-6 bg-custom-primary  bg-clip-text text-transparent">
                            Welcome to StudentHub
                        </h1>
                        <p className="text-xl md:text-2xl text-custom-secondary mb-8 max-w-3xl mx-auto font-inter">
                            Join communities, share your thoughts, and message friends — built just for students.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                            <button className="group bg-custom-accent text-custom-primary px-8 py-4 rounded-xl text-lg font-semibold hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center animate-pulse"
                                onClick={() => navigate('/register')}>
                                Register
                                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="px-8 py-4 border border-slate-600 text-white rounded-xl text-lg font-semibold hover:bg-slate-800 transition-all duration-300 transform hover:scale-105"
                                onClick={() => navigate('/login')}>
                                Log in
                            </button>
                        </div>

                    </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-1/4 left-10 w-20 h-20 bg-custom-primary rounded-full blur-xl animate-bounce"></div>
                <div className="absolute top-1/3 right-10 w-32 h-32 bg-custom-secondary from-pink-400/20 to-purple-500/20 rounded-full blur-xl animate-pulse"></div>
            </section>

            {/* Footer */}
            <footer className="bg-custom-accent/10 border-t border-slate-700/50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center mb-4">
                                <img src="logo.png" className='w-5 h-5'></img>
                                <span className="ml-3 text-xl font-bold font-spectral text-white">StudentHub</span>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-white font-semibold mb-4">Product</h4>
                            <ul className="space-y-2 text-slate-400">
                                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-semibold mb-4">Company</h4>
                            <ul className="space-y-2 text-slate-400">
                                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-semibold mb-4">Support</h4>
                            <ul className="space-y-2 text-slate-400">
                                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-custom-div mt-12 pt-8 text-center text-slate-400">
                        <p>&copy; 2025 StudentHub. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default PageTransition(LandingPage)