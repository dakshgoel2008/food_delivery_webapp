import React from "react";
import { useNavigate } from "react-router-dom";
import Styles from "./CSS/Error.module.css";

const ErrorPage = ({ errorCode = 404, message = "Page Not Found" }) => {
    const navigate = useNavigate();

    return (
        <div className={Styles["error-container"]}>
            <h1 className={Styles["error-code floating"]}>{errorCode}</h1>
            <p className={Styles["error-message"]}>{message}</p>
            <button className={Styles["home-btn"]} onClick={() => navigate("/app")}>
                Go to Home
            </button>
        </div>
    );
};

export default ErrorPage;
