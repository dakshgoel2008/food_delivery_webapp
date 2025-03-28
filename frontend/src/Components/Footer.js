import React from "react";
import { NavLink } from "react-router-dom";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa"; // Import icons
import "./Footer.css";
import logo from "../Assets/logo.png";
const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white text-center p-4">
            <div className="logos">
                <img src={logo} alt="EatEase Logo" className="h-10 website-logo" /> {/* Adjust height if needed */}
                <h2 className="text-yellow-400 text-lg font-semibold">EatEase</h2>
            </div>
            <p className="text-sm">&copy; 2025 EatEase. All Rights Reserved.</p>
            {/* <nav className="mt-2">
                <NavLink to="/" className="text-yellow-400 hover:underline mx-2">
                    About
                </NavLink>
                <NavLink to="/" className="text-yellow-400 hover:underline mx-2">
                    Add Restaurant
                </NavLink>
                <NavLink to="/" className="text-yellow-400 hover:underline mx-2">
                    Customer
                </NavLink>
            </nav> */}

            {/* Social Media Links */}
            <div className="flex justify-center mt-4 space-x-4">
                <a
                    href="https://www.linkedin.com/in/daksh-goel-2008x"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-400 text-2xl hover:text-white"
                >
                    <FaLinkedin />
                </a>
                <a
                    href="https://github.com/dakshgoel2008"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-400 text-2xl hover:text-white"
                >
                    <FaGithub />
                </a>
                <a href="mailto:your-email@gmail.com" className="text-yellow-400 text-2xl hover:text-white">
                    <FaEnvelope />
                </a>
            </div>
        </footer>
    );
};

export default Footer;
