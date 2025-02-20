import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../Utils/axios.js";
import AllRestaurants from "../Components/Restaurants/AllRestaurants.js";
import Styles from "./CSS/home.module.css";

const Home = () => {
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        async function getRestaurantDetails() {
            try {
                let { data } = await axios.get("/restaurant/all");
                console.log("API Response:", data); // ✅ Debugging
                dispatch({
                    type: "SET_RESTAURANTS",
                    payload: data.data,
                });
            } catch (error) {
                console.error("Error fetching restaurants:", error);
            }
        }
        getRestaurantDetails();
    }, [dispatch]);

    return (
        <div className={Styles["home-container"]}>
            <h1 className={Styles["home-heading"]}>Welcome, {userData.username}!</h1>
            <AllRestaurants />
        </div>
    );
};

export default Home;
