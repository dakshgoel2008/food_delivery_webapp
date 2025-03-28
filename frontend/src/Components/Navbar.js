import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Styles from "./Navbar.module.css";
import ProfileImage from "./ProfileImage.js";
const Navbar = () => {
    const userData = useSelector((state) => state.userReducer); // in userReducer we have isLoggedIn
    return (
        <div className={Styles["After-login-CSS"]}>
            <div className={Styles["Navlinks_Css"]}>
                {/* initially isLoggedIn is False */}
                {/* we are able to use all useReducers because of Provider */}
                {userData.isLoggedIn && <NavLink to="/cart">DineCart</NavLink>}
                {userData.isLoggedIn && <NavLink to="/history">Order History</NavLink>}
                {userData.isLoggedIn && <NavLink to="/logout">Logout</NavLink>}
                {userData.isLoggedIn && <ProfileImage imageUrl={userData.image}></ProfileImage>}
            </div>
        </div>
    );
};

export default Navbar;
