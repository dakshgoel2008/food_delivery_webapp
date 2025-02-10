import Styles from "./CSS/auth.module.css";
import React, { useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const nameRef = useRef();
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const signupHandler = async () => {
        const formData = new FormData();
        formData.append("username", usernameRef.current.value);
        formData.append("email", emailRef.current.value);
        formData.append("password", passwordRef.current.value);
        formData.append("name", nameRef.current.value);
        if (image) formData.append("image", image);

        try {
            await axios.post("http://localhost:4444/signup", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            alert("Signup successful! Please log in.");
            navigate("/login");
        } catch (err) {
            alert(err.response?.data.message || "Signup failed.");
        }
    };

    return (
        <div className={Styles["auth-page"]}>
            <div className={Styles["auth-container"]}>
                <h2>Signup</h2>
                <input ref={usernameRef} type="text" placeholder="Enter username" />
                <input ref={emailRef} type="email" placeholder="Enter email" />
                <input ref={passwordRef} type="password" placeholder="Enter password" />
                <input ref={nameRef} type="text" placeholder="Enter name" />
                <input type="file" accept="image/*" onChange={handleImageChange} />
                <button onClick={signupHandler}>Signup</button>
                <p>
                    Already have an account?{" "}
                    <NavLink to="/login" className={Styles["nav-link"]}>
                        Login
                    </NavLink>
                </p>
            </div>
        </div>
    );
};

export default Signup;
