import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    const [isDarkMode, setIsDarkMode] = React.useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });

    React.useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    return (
        <nav className="navbar">
            <div className="nav-brand">
                <Link to="/">🍽️ Kitchen Recipes</Link>
            </div>
            <div className="nav-links">
                <a href="http://localhost:4200/recipes" className="nav-item">Rețete (Angular)</a>
                <Link to="/shopping-list" className="nav-item">Lista de Cumpărături</Link>
                <button className="nav-item" onClick={() => setIsDarkMode(!isDarkMode)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>
                    {isDarkMode ? '☀️' : '🌙'}
                </button>
                <button className="nav-btn">Logout</button>
            </div>
        </nav>
    );
}

export default Navbar;
