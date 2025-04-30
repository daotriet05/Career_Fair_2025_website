import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase-config'; // Adjust path as needed
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import ReCAPTCHA from "react-google-recaptcha";

const RECAPTCHA_SITE_KEY = process.env.REACT_APP_RECAPTCHA_SITE_KEY;

function LoginSection() {
    const [studentEmail, setStudentEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
    const [captchaToken, setCaptchaToken] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
              setIsLoggedIn(true);
            //   navigate('/'); // Navigate to home if already logged in
            } else {
              setIsLoggedIn(false);
            }
        });

        return () => unsubscribe(); // Cleanup subscription on unmount
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
    
        if (!captchaToken) {
            setError("Please complete the CAPTCHA.");
            return;
        }

        console.log("Captcha token sending:", captchaToken); // Add this to debug

        // 1. Verify CAPTCHA token with Firebase Cloud Function
        try {
            const captchaRes = await fetch("https://us-central1-careerfair2025-user-data.cloudfunctions.net/verifyCaptcha", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token: captchaToken })
            });

            const captchaData = await captchaRes.json();
    
            if (!captchaData.success) {
                console.error("Captcha server response failed:", captchaData); // Debugging server response
                setError("CAPTCHA verification failed. Please try again.");
                return;
            }
        } catch (captchaError) {
            console.error("Captcha verification error:", captchaError);
            setError("CAPTCHA verification failed. Please try again later.");
            return;
        }

        // 2. Proceed with Firebase sign-in
        try {
            await signInWithEmailAndPassword(auth, studentEmail, password);
            console.log('Login successful!');
            navigate('/'); // Navigate to the home page (assuming '/' is your home route)
        } catch (authError) {
            console.error('Login failed:', authError);
            if (authError.code === 'auth/user-not-found') {
                setError('User not found.');
            } else if (authError.code === 'auth/wrong-password') {
                setError('Incorrect password.');
            } else {
                setError('Login failed: ' + authError.message);
            }
        }
    };    


    const handleRegisterNavigation = () => {
        navigate('/student-registration'); // Navigate to the registration page
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Log In</h2>
            <form onSubmit={handleLogin}>
            <input
                type="text"
                placeholder="Enter your VGU Student mail"
                value={studentEmail}
                onChange={(e) => setStudentEmail(e.target.value)}
                className="w-full px-4 py-2 bg-gray-100 border rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-gray-100 border rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                required
            />
            {RECAPTCHA_SITE_KEY && (
                <ReCAPTCHA
                    sitekey={RECAPTCHA_SITE_KEY}
                    onChange={(value) => setCaptchaToken(value)}
                    className="mb-4"
                />
            )}
            <button
                type="submit"
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 rounded-full focus:outline-none focus:shadow-outline"
            >
                Log In
            </button>
            </form>
            {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
            <p className="text-gray-600 text-sm mt-4 text-center">
            If you do not have an account, please{' '}
            <button
                onClick={handleRegisterNavigation}
                className="text-blue-500 hover:underline focus:outline-none focus:shadow-outline"
            >
                sign up
            </button>
            </p>
        </div>
        </div>
    );
}

export default LoginSection;