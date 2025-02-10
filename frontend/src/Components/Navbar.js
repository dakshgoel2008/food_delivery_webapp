import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Styles from "./Navbar.module.css";
const Navbar = () => {
    const userData = useSelector((state) => state.userReducer); // in userReducer we have isLoggedIn
    return (
        <div className={Styles["Navlinks_Css"]}>
            {/* initially isLoggedIn is False */}
            {/* we are able to use all useReducers because of Provider */}
            {userData.isLoggedIn && <NavLink to="/app">App</NavLink>}
            {userData.isLoggedIn && <NavLink to="/cart">Cart</NavLink>}
            {userData.isLoggedIn && <NavLink to="/history">History</NavLink>}
            {userData.isLoggedIn && <NavLink to="/logout">Logout</NavLink>}
        </div>
    );
};

export default Navbar;
