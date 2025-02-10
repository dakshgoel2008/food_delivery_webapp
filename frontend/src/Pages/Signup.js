import { useDispatch } from "react-redux";
import axios from "../Utils/axios.js";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const nameRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const signupHandler = async () => {
        const username = usernameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        try {
            const { data } = await axios.post("/signup", { username, email, password });
            console.log(data);

            // SET USER DATA TO THE REDUX
            dispatch({ type: "SET_USER", payload: data.user });

            // NAVIGATE TO HOME PAGE:
            navigate("/app");
        } catch (err) {
            alert("Difficulty in signup: ", err.response.data.message);
            console.log(err);
        }
    };

    return (
        <div>
            <input ref={usernameRef} type="text" placeholder="Enter username"></input>
            <br />
            <input ref={emailRef} type="email" placeholder="Enter email"></input>
            <br />
            <input ref={passwordRef} type="password" placeholder="Enter password"></input>
            <br />
            <input ref={nameRef} type="name" placeholder="Enter name"></input>
            <br />
            <button onClick={signupHandler}>Signup</button>
        </div>
    );
};

export default Signup;
