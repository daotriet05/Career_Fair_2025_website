import React from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import "../App.css";
import vgulogo from '../images/vgu-logo.png';

function HeaderBar() {
    return (
        <header className="text-white">

            {/* Sticky Navbar */}
            <nav className="custom-navbar">

                {/* Left Section */}
                <div style={styles.leftSection}>
                    <img src={vgulogo} alt="VGU Logo" style={styles.logo} />
                </div>

                {/* Navigation Links */}
                <div style={styles.navLinks}>
                    <a href="#" style={styles.navLink}>Home</a>
                    <a href="#" style={styles.navLink}>Information</a>
                    <a href="#" style={styles.navLink}>Agenda</a>
                    <a href="#" style={styles.navLink}>Sponsor</a>
                    <a href="#" style={styles.navLink}>Recap</a>
                </div>

                {/* Buttons */}
                <div style={styles.buttonContainer}>
                    <button style={styles.registerButton}>REGISTER NOW</button>
                </div>
            </nav>

            {/* Internal CSS for global class */}
            <style>{`
                .custom-navbar {
                    position: fixed;
                    top: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 66.6667%;
                    height: 5rem;
                    margin: 1.25rem;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0.75rem;
                    background-image: linear-gradient(to right, #e5e7eb, #f3f4f6);
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    z-index: 50;
                    border-radius: 0.5rem;
                }

                .text-white {
                    color: white;
                }

                @media (max-width: 768px) {
                    .custom-navbar .nav-links {
                        display: none;
                    }
                }
            `}</style>
        </header>
    );
}

const styles = {
    leftSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
    },
    logo: {
        height: '3rem',
    },
    navLinks: {
        display: 'flex',
        gap: '1.5rem',
        color: '#4B5563', // text-gray-600
        fontSize: '1.125rem', // text-lg
        fontWeight: 500, // font-medium
    },
    navLink: {
        color: '#4B5563',
        textDecoration: 'none',
        transition: 'color 0.3s ease',
    },
    buttonContainer: {
        display: 'flex',
        gap: '0.5rem',
    },
    registerButton: {
        backgroundColor: '#f6c914',
        height: '3rem',
        color: 'black',
        padding: '0.5rem 2.5rem',
        fontSize: '0.875rem',
        fontWeight: 'bold',
        borderRadius: '0.375rem',
        border: 'none',
        cursor: 'pointer',
    },
};

export default HeaderBar;
