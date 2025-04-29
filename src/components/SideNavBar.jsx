import { HashLink } from "react-router-hash-link";
import { Link } from "react-router-dom"; 
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import "../App.css";
import ArrowLeft from "../images/SideNavBar/arrowLeft.png";
import image1 from "../images/SideNavBar/image-1.png";
import React from "react";

export const SideNavBar = ({ isLoggedIn, showLogoutButton, isVisible, setIsVisible }) => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Logged out successfully!");
      setIsVisible(false); // Hide sidebar on logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <>
      {/* Overlay background when sidebar is open */}
      {isVisible && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-40"
          onClick={() => setIsVisible(false)}
        />
      )}

      {/* Sidebar container with slide-in/out animation */}
      <div
        className={`fixed inset-0 bg-white z-50 flex flex-col transform transition-transform duration-300 ${
          isVisible ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="bg-white w-full flex flex-col items-center h-screen overflow-auto relative">
          {/* Top Logo */}
          <div className="flex flex-col items-center mt-4 mb-8">
            <img src={image1} alt="Logo" className="h-16 object-contain" />
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col space-y-4 w-11/12">
            <HashLink
              smooth
              to="/#intro"
              onClick={() => setIsVisible(false)}
              className="block w-full bg-white border border-gray-300 rounded-xl py-3 text-center text-lg font-light text-black hover:bg-gray-100"
            >
              Home
            </HashLink>
            <HashLink
              smooth
              to="/#info"
              onClick={() => setIsVisible(false)}
              className="block w-full bg-white border border-gray-300 rounded-xl py-3 text-center text-lg font-light text-black hover:bg-gray-100"
            >
              Information
            </HashLink>
            <HashLink
              smooth
              to="/#agenda"
              onClick={() => setIsVisible(false)}
              className="block w-full bg-white border border-gray-300 rounded-xl py-3 text-center text-lg font-light text-black hover:bg-gray-100"
            >
              Agenda
            </HashLink>
            <HashLink
              smooth
              to="/#jobs"
              onClick={() => setIsVisible(false)}
              className="block w-full bg-white border border-gray-300 rounded-xl py-3 text-center text-lg font-light text-black hover:bg-gray-100"
            >
              Jobs
            </HashLink>
            <HashLink
              smooth
              to="/#workshop"
              onClick={() => setIsVisible(false)}
              className="block w-full bg-white border border-gray-300 rounded-xl py-3 text-center text-lg font-light text-black hover:bg-gray-100"
            >
              Workshop
            </HashLink>
            <HashLink
              smooth
              to="/#recap"
              onClick={() => setIsVisible(false)}
              className="block w-full bg-white border border-gray-300 rounded-xl py-3 text-center text-lg font-light text-black hover:bg-gray-100"
            >
              Recap
            </HashLink>
          </div>

          {/* Bottom Button */}
            <div className="absolute bottom-8 w-11/12 flex justify-center">
            {isLoggedIn ? (
                showLogoutButton ? (
                <Link to="/">
                    <button
                    onClick={() => {
                        handleLogout();
                        setIsVisible(false); // 🔥 hide sidebar after logout
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-md text-lg w-full"
                    >
                    Log Out
                    </button>
                </Link>
                ) : (
                <Link
                    to="/dashboard"
                    onClick={() => setIsVisible(false)} // 🔥 hide sidebar after click
                    className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-md text-lg w-full text-center"
                >
                    Dashboard
                </Link>
                )
            ) : (
                <Link
                to="/login"
                onClick={() => setIsVisible(false)} // 🔥 hide sidebar after login
                className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 md:px-10 py-2 h-12 text-sm font-bold rounded-md flex items-center justify-center transition duration-200"
                >
                Log In
                </Link>
            )}
            </div>

          {/* Back Arrow */}
          <img
            src={ArrowLeft}
            alt="Back arrow"
            className="absolute top-2 left-2 w-8 h-8 cursor-pointer"
            onClick={() => setIsVisible(false)}
          />
        </div>
      </div>
    </>
  );
};
