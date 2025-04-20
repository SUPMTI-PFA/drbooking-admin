import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import {
    FaBars,
    FaHome,
    FaSignInAlt,
    FaUserPlus,
    FaSignOutAlt,
    FaTimes
} from 'react-icons/fa';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('mbs_user_token');
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('mbs_user_token');
        localStorage.removeItem('mbs_user');
        setIsLoggedIn(false);
        navigate('/login');
    };

    return (
        <>
            {/* Navbar top */}
            <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
                <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="text-2xl font-bold text-orange-500">
                        DreamJob
                    </Link>

                    {/* Hamburger for mobile */}
                    <button
                        className="md:hidden text-gray-700 focus:outline-none"
                        onClick={() => setIsOpen(true)}
                    >
                        <FaBars className="h-6 w-6" />
                    </button>

                    {/* Desktop links */}
                    <div className="hidden md:flex md:items-center gap-6">
                        <Link to="/" className="flex items-center gap-2 text-gray-700 hover:text-orange-500 text-sm font-medium">
                            <FaHome /> Home
                        </Link>

                        {!isLoggedIn ? (
                            <>
                                <Link to="/login" className="flex items-center gap-2 text-gray-700 hover:text-orange-500 text-sm font-medium">
                                    <FaSignInAlt /> Sign In
                                </Link>
                                <Link to="/register" className="flex items-center gap-2 text-gray-700 hover:text-orange-500 text-sm font-medium">
                                    <FaUserPlus /> Sign Up
                                </Link>
                            </>
                        ) : (
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 text-gray-700 hover:text-red-500 text-sm font-medium"
                            >
                                <FaSignOutAlt /> Logout
                            </button>
                        )}
                    </div>
                </div>
            </nav>

            {/* Offcanvas menu for mobile */}
            <div
                className={`fixed top-0 left-0 w-64 h-full bg-white shadow-md z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    } md:hidden`}
            >
                <div className="flex justify-between items-center p-4 border-b">
                    <span className="text-lg font-semibold text-orange-500">Menu</span>
                    <button onClick={() => setIsOpen(false)} className="text-gray-600">
                        <FaTimes size={20} />
                    </button>
                </div>
                <ul className="flex flex-col p-4 gap-4">
                    <li>
                        <Link to="/" className="flex items-center gap-2 text-gray-700 hover:text-orange-500" onClick={() => setIsOpen(false)}>
                            <FaHome /> Home
                        </Link>
                    </li>

                    {!isLoggedIn ? (
                        <>
                            <li>
                                <Link to="/login" className="flex items-center gap-2 text-gray-700 hover:text-orange-500" onClick={() => setIsOpen(false)}>
                                    <FaSignInAlt /> Sign In
                                </Link>
                            </li>
                            <li>
                                <Link to="/register" className="flex items-center gap-2 text-gray-700 hover:text-orange-500" onClick={() => setIsOpen(false)}>
                                    <FaUserPlus /> Sign Up
                                </Link>
                            </li>
                        </>
                    ) : (
                        <li>
                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                    handleLogout();
                                }}
                                className="flex items-center gap-2 text-gray-700 hover:text-red-500"
                            >
                                <FaSignOutAlt /> Logout
                            </button>
                        </li>
                    )}
                </ul>
            </div>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}
        </>
    );
};

export default Navbar;
