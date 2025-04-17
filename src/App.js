import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import RegisterSection from './components/Login-SignUp-Components/RegisterSection';
import LoginSection from "./components/Login-SignUp-Components/LoginSection";
import Dashboard from './components/Dashboard';
import { auth } from './firebase-config'; // Import Firebase auth
import { onAuthStateChanged } from 'firebase/auth';


function App() {

  const [isLoggedIn, setIsLoggedIn] = React.useState(false); // Track login status
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
        if (authUser) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    });

    return () => unsubscribe();
  }, []);

  const getAuthButton = () => {
    if (isLoggedIn) {
        return (
            <Link to="/dashboard" className="bg-yellow-400 h-12 text-black px-6 md:px-10 py-2 text-sm font-bold rounded-md flex items-center justify-center">
                Dashboard
            </Link>
        );
    } else {
        return (
            <Link to="/login" className="bg-yellow-400 h-12 text-black px-6 md:px-10 py-2 text-sm font-bold rounded-md flex items-center justify-center">
                Login
            </Link>
        );
    }
  };

  return (
    <Router>
      <div className="App">
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/student-registration" element={<RegisterSection />} />
            <Route path="/login" element={<LoginSection />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>

    </Router>
  );
}

export default App;