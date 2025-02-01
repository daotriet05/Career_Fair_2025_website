import React from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import "../App.css";
import vgulogo from '../images/vgu-logo.png';

function HeaderBar() {
    return (
        <header class="text-white">

            {/* Sticky Navbar */}
            <nav class="fixed top-0 left-1/2 transform -translate-x-1/2 w-2/3 h-20 m-5 flex items-center justify-between p-3 bg-gradient-to-r from-gray-200 to-gray-100 shadow-md z-50 rounded-lg">

                
                {/* Left Section */}
                <div class="flex items-center space-x-2">
                    <img src={vgulogo} alt="VGU Logo" class="h-12"></img>
                    
                    {/* 
                        <span class="text-2xl font-bold">VGU</span>
                        <span class="font-bold text-black">UNIVERSE</span><span class="text-gray-500 font-semibold">'24</span>
                    */}
                </div>

                {/* Navigation Links */}
                <div class="hidden md:flex space-x-6 text-gray-600 text-lg font-medium">
                    <a href="#" class="hover:text-black">Home</a>
                    <a href="#" class="hover:text-black">Information</a>
                    <a href="#" class="hover:text-black">Agenda</a>
                    <a href="#" class="hover:text-black">Sponsor</a>
                    <a href="#" class="hover:text-black">Recap</a>
                </div>

                {/* Buttons */}
                <div class="flex space-x-2">
                    <button class="bg-white h-12 text-black px-10 py-2 text-sm font-bold rounded-md" style={{ backgroundColor: '#f6c914'}}>REGISTER NOW</button>
                </div>
            </nav>

        </header>
    );
}

export default HeaderBar;
