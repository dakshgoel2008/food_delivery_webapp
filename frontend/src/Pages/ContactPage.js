import React from "react";
import Footer from "../Components/Footer.js";
import "./CSS/ContactPage.css";
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub, FaMapMarkerAlt, FaUser } from "react-icons/fa";

const ContactPage = () => {
    return (
        <>
            <div className="contact-container">
                <h1 className="contact-heading">My Details</h1>
                <div className="contact-card">
                    <div className="contact-info">
                        <h2 className="name">
                            <FaUser /> Developed By: Daksh Goel
                        </h2>
                        <p>
                            <FaMapMarkerAlt /> VIT Vellore
                        </p>
                        <p className="my-details">
                            <a
                                href="https://www.linkedin.com/in/daksh-goel-2008x"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaLinkedin />
                            </a>
                            <a href="https://github.com/dakshgoel2008" target="_blank" rel="noopener noreferrer">
                                <FaGithub />
                            </a>
                        </p>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default ContactPage;
