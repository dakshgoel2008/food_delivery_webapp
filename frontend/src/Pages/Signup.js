import Styles from "./CSS/auth.module.css";
import React, { useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "../Utils/axios.js";
import signUp from "../Assets/signUp.png";
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
            await axios.post("/signup", formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true, // to set cookies on the browser in cross origin requests
            });

            alert("Signup successful! Please log in.");
            navigate("/login");
        } catch (err) {
            alert(err.response?.data.message || "Signup failed.");
        }
    };

    return (
        <div className={Styles["auth-page"]}>
            <img src={signUp} alt="Login" className={Styles["auth-image"]} />
            <div className={Styles["auth-container"]}>
                <h2>Signup</h2>
                <input ref={usernameRef} type="text" placeholder="Enter Username" />
                <input ref={emailRef} type="email" placeholder="Enter Email" />
                <input ref={passwordRef} type="password" placeholder="Enter Password" />
                <input ref={nameRef} type="text" placeholder="Enter Name" />
                <legend className={Styles["file-upload-container"]}>
                    <label htmlFor="profile-image" className={Styles["file-upload-label"]}>
                        Choose Profile Image
                    </label>
                    <input
                        id="profile-image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className={Styles["file-upload-input"]}
                    />
                </legend>

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
