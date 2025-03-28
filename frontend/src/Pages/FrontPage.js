import React from "react";
import "./CSS/FrontPage.css";
import NavBar from "../Components/FrontPageNavBar.js"; // Ensure correct import path
import secondImage from "../Assets/frontPageImage1.png";
import Footer from "../Components/Footer.js";
const FrontPage = () => {
    return (
        <>
            <NavBar /> {/* Use it as a JSX component */}
            <div className="first-look">
                <video autoPlay loop muted playsInline className="background-video">
                    <source
                        src="https://b.zmtcdn.com/data/file_assets/2627bbed9d6c068e50d2aadcca11ddbb1743095925.mp4"
                        type="video/mp4"
                    />
                    Your browser does not support the video tag.
                </video>
                <div className="background-overlay"></div>

                {/* Hero Section */}
                <div className="hero-text">
                    <div className="webby">EatEase</div>
                    <div className="text">Craving Something Delicious? 🍔</div>
                    <div className="text">Lets discover your today's meal</div>
                </div>
                <div className="scroll-down">↓</div>
            </div>
            <div className="images">
                <img src={secondImage} alt="Decorated-image" className="second-image" />
            </div>
            <Footer></Footer>
        </>
    );
};

export default FrontPage;
