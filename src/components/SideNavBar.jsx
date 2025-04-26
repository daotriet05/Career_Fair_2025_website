import React from "react";
import { HashLink } from "react-router-hash-link";
import { Link } from "react-router-dom"; 
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import "../App.css";
import ArrowLeft from "../images/SideNavBar/arrowLeft.png";
import image1 from "../images/SideNavBar/image-1.png";

export const SideNavBar = ({ isLoggedIn, showLogoutButton }) => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="bg-white w-full flex flex-col items-center h-screen overflow-auto relative">
      {/* Top Logo */}
      <div className="flex flex-col items-center mt-4 mb-8">
        <img src={image1} alt="Logo" className="h-16 object-contain" />
        <h1 className="text-2xl font-bold text-black mt-2">CAREER FAIR</h1>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col space-y-4 w-11/12">
        <HashLink smooth to="/#intro" className="block w-full bg-white border border-gray-300 rounded-xl py-3 text-center text-lg font-light text-black hover:bg-gray-100">
          Home
        </HashLink>
        <HashLink smooth to="/#info" className="block w-full bg-white border border-gray-300 rounded-xl py-3 text-center text-lg font-light text-black hover:bg-gray-100">
          Information
        </HashLink>
        <HashLink smooth to="/#agenda" className="block w-full bg-white border border-gray-300 rounded-xl py-3 text-center text-lg font-light text-black hover:bg-gray-100">
          Agenda
        </HashLink>
        <HashLink smooth to="/#jobs" className="block w-full bg-white border border-gray-300 rounded-xl py-3 text-center text-lg font-light text-black hover:bg-gray-100">
          Jobs
        </HashLink>
        <HashLink smooth to="/#workshop" className="block w-full bg-white border border-gray-300 rounded-xl py-3 text-center text-lg font-light text-black hover:bg-gray-100">
          Workshop
        </HashLink>
        <HashLink smooth to="/#recap" className="block w-full bg-white border border-gray-300 rounded-xl py-3 text-center text-lg font-light text-black hover:bg-gray-100">
          Recap
        </HashLink>
      </div>

      {/* Button at the bottom */}
      <div className="absolute bottom-8 w-11/12 flex justify-center">
        {isLoggedIn ? (
          showLogoutButton ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-md text-lg w-full"
            >
              Log Out
            </button>
          ) : (
            <Link
              to="/dashboard"
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-md text-lg w-full text-center"
            >
              Dashboard
            </Link>
          )
        ) : (
          <Link
            to="#"
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-md text-lg w-full text-center"
          >
            Company Registration
          </Link>
        )}
      </div>

      {/* Back Arrow */}
      <img
        src={ArrowLeft}
        alt="Back arrow"
        className="absolute top-2 left-2 w-8 h-8"
      />
    </div>
  );
};
