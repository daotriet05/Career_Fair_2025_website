import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import useLenis from './components/EffectComponents/useLenis';
import AnimatedCursor from "react-animated-cursor";
import HomePage from './components/HomePage';
import RegisterSection from './components/Login-SignUp-Components/RegisterSection';
import LoginSection from "./components/Login-SignUp-Components/LoginSection";
import Dashboard from './components/Dashboard';
import HeaderBar from './components/HeaderBar'; // Import HeaderBar
import { auth } from './firebase-config'; // Import Firebase auth
import { Footer } from './components/Footer'
import { SideNavBar } from './components/SideNavBar';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const [showReady, setCursorReady] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth < 768); // Check if screen width is larger than 768px
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth > 600); // Track if screen width is smaller than 600px

  useLenis();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsLoggedIn(!!user);
      console.log("Auth state changed, isLoggedIn:", !!user);
    });
    
    // Update isSmallScreen state when the window resizes
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768);
      setIsSmallScreen(window.innerWidth < 600);
    };

    // Event listener for resize
    window.addEventListener("resize", handleResize);

    // Delay mounting the cursor slightly
    const timer = setTimeout(() => {
      setCursorReady(true);
    }, 100); // even 10ms might be enough
    
    return () => {
      clearTimeout(timer);
      unsubscribe();
      window.removeEventListener("resize", handleResize); // Clean up the resize event listener
    };
  }, []);

  return (
    <Router>
      <div className="App">
        {/* Only show the animated cursor on desktop */}
        {isDesktop && showReady ? (
          <AnimatedCursor
			className="custom-cursor"
            color="#fff"
            innerSize={15}
            outerSize={45}
            innerScale={0.5}
            outerScale={3}
            outerAlpha={0}
            outerStyle={{
              mixBlendMode: 'exclusion',
              zIndex: 9999
            }}
            innerStyle={{
              zIndex: 9999
            }}
          />
        ) : (
          <AnimatedCursor /> // default basic cursor for mobile
        )}

        {/* Conditionally render HeaderBar or SideNavBar based on screen size */}
        {isSmallScreen ? (
          <SideNavBar isLoggedIn={isLoggedIn} /> // Show SideNavBar on small screens
        ) : (
          <HeaderBar isLoggedIn={isLoggedIn} /> // Show HeaderBar on large screens
        )}

        <Routes>
          <Route path="/" element={
            <>
              <HomePage />
            </>
          } />
          <Route path="/student-registration" element={
            <>
              <RegisterSection />
            </>					
          } />
          <Route path="/login" element={
            <>
              <LoginSection />
            </>
          } />
          <Route path="/dashboard" element={
            <>
              <Dashboard />
            </>
          } />
        </Routes>
          {/*Footer*/}
            <Footer />
      </div>
    </Router>
  );
}

export default App;
