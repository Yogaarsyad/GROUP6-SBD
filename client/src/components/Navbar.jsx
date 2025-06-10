// components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Menu, X, LogOut, MessageCircle, CircleUser, House} from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;

    const HandleLogOut = () => {
        if (localStorage.getItem("studenthub-token") != null) {
            localStorage.removeItem("studenthub-token");
            navigate("/");
        }
    }

    useEffect(() => {
        console.log(currentPath)
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrollY > 50
            ? 'bg-custom-accent/10 backdrop-blur-md border-b border-slate-700/50'
            : 'bg-transparent'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <Link to="/">
                        <div className="flex items-center">
                            <img src="logo.png" className='w-5 h-5' alt="StudentHub Logo" />
                            <span className="ml-3 text-xl font-spectral font-bold text-custom-primary">
                                StudentHub
                            </span>
                        </div>
                    </Link>

                    <div className="hidden md:flex items-center space-x-1">
                        {currentPath === '/home' && (
                            <button className="bg-transparent text-white px-6 py-2 border-none hover:bg-custom-accent/20"
                                onClick={HandleLogOut}
                            >
                                <House className='text-white' />
                            </button>

                        )}

                        {currentPath === '/home' && (
                            <button className="bg-transparent text-white px-6 py-2 border-none hover:bg-custom-accent/20"
                                onClick={HandleLogOut}
                            >
                                <MessageCircle className='text-white' />
                            </button>

                        )}

                        {currentPath === '/home' && (
                            <button className="bg-transparent text-white px-6 py-2 border-none hover:bg-custom-accent/20"
                                onClick={HandleLogOut}
                            >
                                <CircleUser className='text-white' />
                            </button>

                        )}

                                                {currentPath === '/home' && (
                            <button className="bg-transparent text-white px-6 py-2 rounded-lg hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:bg-red-500"
                                onClick={HandleLogOut}
                            >
                                <LogOut className='text-white' />
                            </button>

                        )}
                    </div>


                    <button
                        className="md:hidden text-white"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-slate-900/95 backdrop-blur-md border-t border-slate-700/50">
                    <div className="px-4 py-4 space-y-4">
                        {currentPath === '/home' && (
                            <button className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 hover:bg-red-500"
                                onClick={HandleLogOut}
                            >
                                <LogOut className='text-white' />
                            </button>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;