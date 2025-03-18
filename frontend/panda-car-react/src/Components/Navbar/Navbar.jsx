// src/Components/Navbar/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { FaCar, FaUser, FaFilm, FaUtensils, FaBell } from 'react-icons/fa';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="logo">
                <Link to="/home">Street Movie Car Booking</Link>
            </div>
            <div className="nav-links">
                <Link to="/home"><FaCar /> Home</Link>
                <Link to="/cars"><FaCar /> Cars</Link>
                <Link to="/account"><FaUser /> Account</Link>
                <Link to="/movies"><FaFilm /> Available Movies</Link>
                <Link to="/foods"><FaUtensils /> Available Foods</Link>
                <Link to="/aws-notifications"><FaBell /> Notifications</Link>
            </div>
        </nav>
    );
};

export default Navbar;