import React from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import "../App.css";
import vgulogo from '../images/vgu-logo.png';

function HeaderBar({ scrollTo }) {
    const handleScroll = (ref) => {
      ref.current?.scrollIntoView({ behavior: 'smooth' });
    };
  
    return (
      <header className="text-white">
        <nav className="fixed top-2 inset-x-0 mx-auto w-11/12 md:w-2/3 max-w-screen-xl h-20 flex items-center justify-between px-3 bg-gradient-to-r from-gray-200 to-gray-100 shadow-md z-50 rounded-lg space-x-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img src={vgulogo} alt="VGU Logo" className="h-12" />
          </div>
  
          {/* Links */}
          <div className="hidden md:flex space-x-6 text-gray-600 text-lg font-medium">
            <button onClick={() => handleScroll(scrollTo.introRef)} className="hover:text-black">Home</button>
            <button onClick={() => handleScroll(scrollTo.infoRef)} className="hover:text-black">Information</button>
            <button onClick={() => handleScroll(scrollTo.agendaRef)} className="hover:text-black">Agenda</button>
            <button onClick={() => handleScroll(scrollTo.workshopRef)} className="hover:text-black">Workshop</button>
            <button onClick={() => handleScroll(scrollTo.recapRef)} className="hover:text-black">Recap</button>
          </div>
  
          {/* Register Button */}
          <div className="flex space-x-2">
            <a
              href="https://docs.google.com/forms/u/1/d/1Um8irhxixuR6jvbCO7Dvp1_AMQYKPsGU4zxirNEWJr0/edit?usp=drivesdk"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow-400 h-12 text-black px-2 md:px-6 py-2 text-sm font-bold rounded-md flex items-center justify-center"
            >
              Company Registration
            </a>
          </div>
        </nav>
      </header>
    );
  }
  
  export default HeaderBar;
  
