import React from "react";
import "./CSS/FrontPage.css";
import NavBar from "../Components/FrontPageNavBar.js"; // Ensure correct import path

const FrontPage = () => {
    return (
        <>
            <NavBar /> {/* Use it as a JSX component */}
            <div className="first-look">
                <div className="background-overlay"></div>

                {/* Hero Section */}
                <div className="hero-text">
                    <div className="webby">Eat Ease</div>
                    <div className="text">Craving Something Delicious? 🍔</div>
                    <div className="text">Lets discover your today's meal</div>
                </div>
            </div>
        </>
    );
};

export default FrontPage;
