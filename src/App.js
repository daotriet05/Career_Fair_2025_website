import React, {useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import useLenis from './components/EffectComponents/useLenis';
import HomePage from './components/HomePage';
import RegisterSection from './components/Login-SignUp-Components/RegisterSection';
import LoginSection from "./components/Login-SignUp-Components/LoginSection";
import Dashboard from './components/Dashboard';
import HeaderBar from './components/HeaderBar'; // Import HeaderBar
import { auth } from './firebase-config'; // Import Firebase auth

import { Navigate } from 'react-router-dom';

// Prevent un logged-in users from accessing the dashboard (or other pages if we want) page
function ProtectedRoute({ isLoggedIn, children }) {
  if (!isLoggedIn) {
	alert("You must log in first to access this page.");
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
	useLenis();

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			setIsLoggedIn(!!user); // Set login status based on user state
			console.log("Auth state changed, isLoggedIn:", !!user);

		});
		return () => unsubscribe(); // Cleanup subscription on unmount
	}, []);

    return (
        <Router>
            <div className="App">
                {/* Header (Example) - Now using HeaderBar */}
                <HeaderBar isLoggedIn={isLoggedIn} />

                <Routes>
                    <Route path="/" element={
						<>
						<HeaderBar isLoggedIn={isLoggedIn} showLogoutButton={false} />
						<HomePage />
						</>
					} />
                    <Route path="/student-registration" element={
						<>
						<HeaderBar isLoggedIn={isLoggedIn} showLogoutButton={false} />
						<RegisterSection />
						</>					
					} />
                    <Route path="/login" element={
						<>
						<HeaderBar isLoggedIn={isLoggedIn} showLogoutButton={false} />
						<LoginSection />
						</>
					} />
                    <Route path="/dashboard" element={
						<ProtectedRoute isLoggedIn={isLoggedIn}>
						<>
							<HeaderBar isLoggedIn={isLoggedIn} showLogoutButton={true} />
							<Dashboard />
						</>
						</ProtectedRoute>
					}
					/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;