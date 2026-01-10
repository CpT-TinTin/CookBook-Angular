import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar">
            <div className="nav-brand">
                <Link to="/">🍽️ Kitchen Recipes</Link>
            </div>
            <div className="nav-links">
                <Link to="/" className="nav-item">Rețete</Link>
                <Link to="/favorites" className="nav-item">Favorite</Link>
                <button className="nav-btn">Logout</button>
            </div>
        </nav>
    );
}

export default Navbar;
