import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import useLenis from './components/EffectComponents/useLenis';
import AnimatedCursor from "react-animated-cursor";
import HomePage from './components/HomePage';
import RegisterSection from './components/Login-SignUp-Components/RegisterSection';
import LoginSection from "./components/Login-SignUp-Components/LoginSection";
import Dashboard from './components/Dashboard';
import HeaderBar from './components/HeaderBar';
import { auth } from './firebase-config';
import { Footer } from './components/Footer'
import { SideNavBar } from './components/SideNavBar';

function AppWrapper() {
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showReady, setCursorReady] = useState(false);
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 600);
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);

    useLenis();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
        //     setIsLoggedIn(!!user);
        // });
            if (user) {
                setIsLoggedIn(true); //  Allow any authenticated user
            } else {
                setIsLoggedIn(false);
            }
        });

        const handleResize = () => {
            setIsDesktop(window.innerWidth > 768);
            setIsSmallScreen(window.innerWidth < 600);
        };

        window.addEventListener("resize", handleResize);

        const timer = setTimeout(() => setCursorReady(true), 100);
        return () => {
            clearTimeout(timer);
            unsubscribe();
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleMenuClick = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    // Decide whether to show logout button based on route
    const showLogoutButton =
        location.pathname === "/dashboard" ? true : false;

    return (
        <div className="App">
            {isDesktop && showReady ? (
                <AnimatedCursor
                    className="custom-cursor"
                    color="#fff"
                    innerSize={15}
                    outerSize={45}
                    innerScale={0.5}
                    outerScale={3}
                    outerAlpha={0}
                    outerStyle={{ mixBlendMode: 'exclusion', zIndex: 9999 }}
                    innerStyle={{ zIndex: 9999 }}
                />
            ) : (
                <AnimatedCursor />
            )}

            {isSidebarVisible ? (
                <SideNavBar
                    isVisible={isSidebarVisible}
                    setIsVisible={setIsSidebarVisible}
                    isLoggedIn={isLoggedIn}
                    showLogoutButton={showLogoutButton}
                />
            ) : (
                <HeaderBar
                    onMenuClick={handleMenuClick}
                    isLoggedIn={isLoggedIn}
                    showLogoutButton={showLogoutButton}
                />
            )}

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/student-registration" element={<RegisterSection />} />
                <Route path="/login" element={<LoginSection />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>

            <Footer />
        </div>
    );
}

function App() {
    return (
        <Router>
            <AppWrapper />
        </Router>
    );
}

export default App;
