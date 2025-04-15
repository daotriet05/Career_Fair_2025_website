import React from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import "../App.css";
import vgulogo from '../images/vgu-logo.png';

function HeaderBar() {
    return (
        <header className="text-white">

            {/* Sticky Navbar */}
            <nav className="fixed top-2 inset-x-0 mx-auto w-11/12 md:w-2/3 max-w-screen-xl h-20 flex items-center justify-between px-3 bg-gradient-to-r from-gray-200 to-gray-100 shadow-md z-50 rounded-lg">




                {/* Left Section */}
                <div className="flex items-center space-x-2">
                    <img src={vgulogo} alt="VGU Logo" className="h-12" />
                </div>

                {/* Navigation Links */}
                <div className="hidden md:flex space-x-6 text-gray-600 text-lg font-medium">
                    <a href="#" className="hover:text-black">Home</a>
                    <a href="#" className="hover:text-black">Information</a>
                    <a href="#" className="hover:text-black">Agenda</a>
                    <a href="#" className="hover:text-black">Jobs</a>
                    <a href="#" className="hover:text-black">Workshop</a>
                    <a href="#" className="hover:text-black">Sponsor</a>
                </div>

                {/* Buttons */}
                <div className="flex space-x-2">
                    <a
                        href="https://docs.google.com/forms/u/1/d/1Um8irhxixuR6jvbCO7Dvp1_AMQYKPsGU4zxirNEWJr0/edit?usp=drivesdk"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-yellow-400 h-12 text-black px-6 md:px-10 py-2 text-sm font-bold rounded-md flex items-center justify-center"
                    >
                        REGISTER NOW
                    </a>
                </div>
            </nav>
        </header>
    );
}

export default HeaderBar;
