import React from "react";
import { HashLink } from "react-router-hash-link";
import { Link } from "react-router-dom"; // Import Link for /login or /dashboard
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config"; // Import Firebase auth
import "../App.css";
import vgulogo from "../images/vgu-logo.png";



function HeaderBar({ isLoggedIn, showLogoutButton }) { // Receive isLoggedIn as a prop	
	
	const handleLogout = async () => {
		try {
			await signOut(auth); // Sign out from Firebase
			console.log("Logged out successfully!");
		} catch (error) {
			console.error("Error logging out:", error);
		}
	};
    
	return (
        <header className="text-white">
            <nav className="fixed top-2 inset-x-0 mx-auto w-11/12 md:w-2/3 max-w-screen-xl h-20 flex items-center justify-between px-3 bg-gradient-to-r from-gray-200 to-gray-100 shadow-md z-50 rounded-lg space-x-4">
                {/* Logo */}
                <div className="flex items-center space-x-2">
                    <img src={vgulogo} alt="VGU Logo" className="h-12" />
                </div>


                {/* Navigation Links */}
                <div className="hidden md:flex space-x-6 text-gray-600 text-lg font-medium">
                    <HashLink smooth to="/#intro" className="hover:text-black">Home</HashLink>
                    <HashLink smooth to="/#info" className="hover:text-black">Information</HashLink>
                    <HashLink smooth to="/#agenda" className="hover:text-black">Agenda</HashLink>
                    <HashLink smooth to="/#jobs" className="hover:text-black">Jobs</HashLink>
                    <HashLink smooth to="/#workshop" className="hover:text-black">Workshop</HashLink>
                    <HashLink smooth to="/#recap" className="hover:text-black">Recap</HashLink>
                </div>

                {/* Conditional Button */}
                <div className="flex space-x-2">
				{isLoggedIn ? (
					showLogoutButton ? (
						<Link to="/">
							<button 
								onClick={handleLogout}
								className="bg-red-500 hover:bg-red-600 text-white px-6 h-12 font-bold rounded-md flex items-center justify-center transition duration-200"
							>Log Out</button></Link>
					) : (
						<Link
							to="/dashboard"
							className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 md:px-10 py-2 h-12 text-sm font-bold rounded-md flex items-center justify-center transition duration-200"
							>
							Dashboard
						</Link>

					)
				) : (
					<Link
						to="/login"
						className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 md:px-10 py-2 h-12 text-sm font-bold rounded-md flex items-center justify-center transition duration-200"
						>
						Log In
					</Link>
				)}
                </div>
            </nav>
        </header>
    );
}

export default HeaderBar;