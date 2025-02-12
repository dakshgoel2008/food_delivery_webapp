import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Styles from "./CSS/Error.module.css";
import { useSelector } from "react-redux";

const errorMessages = [
    "Oops! Looks like this page is out for delivery!",
    "Error 404: This page is still cooking...",
    "Page not found! Maybe it got eaten?",
    "We searched the kitchen, but this page is missing!",
    "Error 404: This page is on a food break!",
];

const ErrorPage = ({ errorCode = 404 }) => {
    const navigate = useNavigate();
    const userData = useSelector((state) => state.userReducer); // in userReducer we have isLoggedIn
    const [redirectMessage, setRedirectMessage] = useState("");

    useEffect(() => {
        // Set a random error message
        const randomMessage = errorMessages[Math.floor(Math.random() * errorMessages.length)];
        setRedirectMessage(randomMessage);

        // Redirect logic
        const redirectTimeout = setTimeout(() => {
            if (userData.isLoggedIn) {
                // If logged in, redirect to /app
                setRedirectMessage("Already logged in! Redirecting to Home...");
                setTimeout(() => navigate("/app"), 2000); // Redirect after 2 seconds
            } else {
                // If not logged in, redirect to /login
                setRedirectMessage("Please log in first! Redirecting to Login...");
                setTimeout(() => navigate("/login"), 2000); // Redirect after 2 seconds
            }
        }, 2000); // Wait 1.5 seconds before showing the redirect message

        // Cleanup timeout
        return () => clearTimeout(redirectTimeout);
    }, [userData.isLoggedIn, navigate]);

    return (
        <div className={Styles["error-container"]}>
            <h1 className={Styles["error-code"]}>{errorCode}</h1>
            <p className={Styles["error-message"]}>{redirectMessage}</p>

            {/* Floating Pizza */}
            <img
                src="https://cdn-icons-png.flaticon.com/512/1404/1404945.png"
                alt="Pizza"
                className={`${Styles["food-item"]} ${Styles.pizza}`}
            />

            {/* Floating Burger */}
            <img
                src="https://cdn-icons-png.flaticon.com/512/5787/5787100.png"
                alt="Burger"
                className={`${Styles["food-item"]} ${Styles.burger}`}
            />

            {/* Floating Taco */}
            <img
                src="https://cdn-icons-png.flaticon.com/512/5787/5787132.png"
                alt="Taco"
                className={`${Styles["food-item"]} ${Styles.taco}`}
            />
        </div>
    );
};

export default ErrorPage;
