import { useDispatch } from "react-redux";
import axios from "axios";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loginHandler = async () => {
        const username = emailRef.current.value;
        const password = passwordRef.current.value;

        try {
            const { data } = await axios.post("http://localhost:4444/login", { username, password });
            console.log(data);

            // SET USER DATA TO THE REDUX
            dispatch({ type: "SET_USER", payload: data.user });

            // NAVIGATE TO HOME PAGE:
            navigate("/app");
        } catch (err) {
            console.error("Login error:", err);

            if (err.response) {
                alert("Difficulty in Login: " + err.response.data.message);
            } else if (err.request) {
                alert("No response received from server. Check if backend is running.");
            } else {
                alert("Request error: " + err.message);
            }
        }
    };

    return (
        <div>
            <input ref={emailRef} type="text" placeholder="Enter username or Email"></input>
            <br />
            <input ref={passwordRef} type="text" placeholder="Enter passoword"></input>
            <br />
            <button onClick={loginHandler}>Login</button>
        </div>
    );
};

export default Login;
