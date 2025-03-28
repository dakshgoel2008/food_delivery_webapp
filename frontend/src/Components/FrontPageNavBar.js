import React from "react";
import { NavLink } from "react-router-dom";
import Styles from "./Navbar.module.css";

const Navbar = () => {
    return (
        <div className={Styles["After-login-CSS"]}>
            <div className={Styles["Navlinks_Css"]}>
                {<NavLink to="/">Add Restaurant</NavLink>}
                {<NavLink to="/login">Customer</NavLink>}
                {<NavLink to="/contactUs">Contact Me</NavLink>}
            </div>
        </div>
    );
};

export default Navbar;
