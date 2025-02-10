import React, { useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import Styles from "./auth.module.css";
const Login = () => {
    const userRef = useRef();
    const passwordRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loginHandler = async () => {
        try {
            const { data } = await axios.post("http://localhost:4444/login", {
                username: userRef.current.value,
                password: passwordRef.current.value,
            });

            dispatch({ type: "SET_USER", payload: { ...data.user, isLoggedIn: true } });
            navigate("/app");
        } catch (err) {
            alert(err.response?.data.message || "Login failed.");
        }
    };

    return (
        <div className={Styles["auth-container"]}>
            <h2>Login</h2>
            <input ref={userRef} type="text" placeholder="Enter Username or Email" />
            <input ref={passwordRef} type="password" placeholder="Enter password" />
            <button onClick={loginHandler}>Login</button>
            <p>
                Don't have an account? <NavLink to="/signup" className={Styles["nav-link"]}>Signup</NavLink>
            </p>
        </div>
    );
};

export default Login;
