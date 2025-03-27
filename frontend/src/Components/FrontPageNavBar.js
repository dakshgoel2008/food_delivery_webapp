import React from "react";
import { NavLink } from "react-router-dom";
import Styles from "./Navbar.module.css";

const Navbar = () => {
    return (
        <div className={Styles["After-login-CSS"]}>
            <div className={Styles["Navlinks_Css"]}>
                {<NavLink to="/">Admin</NavLink>}
                {<NavLink to="/login">User</NavLink>}
            </div>
        </div>
    );
};

export default Navbar;
