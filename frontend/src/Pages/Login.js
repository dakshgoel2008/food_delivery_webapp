import React, { useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "../Utils/axios.js";
import Styles from "./CSS/auth.module.css";
import { setUser } from "../Redux/slices/userSlice.js";
import loginImage from "../Assets/login.png";
const Login = () => {
    const userRef = useRef();
    const passwordRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loginHandler = async () => {
        try {
            const { data } = await axios.post("/login", {
                username: userRef.current.value,
                password: passwordRef.current.value,
                withCredentials: true,
            });
            dispatch(setUser({ ...data.user, isLoggedIn: true }));
            navigate("/app");
        } catch (err) {
            alert(err.response?.data.message || "Login failed.");
        }
    };

    return (
        <div className={Styles["auth-page"]}>
            <img src={loginImage} alt="Login" className={Styles["auth-image"]} />
            <div className={Styles["auth-container"]}>
                <h2>Login</h2>
                <input ref={userRef} type="text" placeholder="Enter Username" />
                <input ref={passwordRef} type="password" placeholder="Enter Password" />
                <button onClick={loginHandler}>Login</button>
                <p>
                    Don't have an account?{" "}
                    <NavLink to="/signup" className={Styles["nav-link"]}>
                        Signup
                    </NavLink>
                </p>
            </div>
        </div>
    );
};

export default Login;
