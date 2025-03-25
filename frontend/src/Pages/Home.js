import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../Utils/axios.js";
import AllRestaurants from "../Components/Restaurants/AllRestaurants.js";
import Styles from "./CSS/home.module.css";
import MySpinner from "../Components/MySpinner.js";
import { setRestaurants } from "../Redux/slices/restaurantSlice.js";
import { setUser } from "../Redux/slices/userSlice.js";
const Home = () => {
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();
    const [isRestaurantFetched, setisRestaurantFetched] = useState(false);
    useEffect(() => {
        async function getRestaurantDetails() {
            try {
                let { data } = await axios.get("/restaurant/all");
                dispatch(setRestaurants(data.data));
                setisRestaurantFetched(true);
            } catch (error) {
                console.error("Error fetching restaurants:", error);
            }
        }
        // fetching the cart details.
        async function getCartDetails() {
            try {
                let { data } = await axios.get("/cart/view");
                dispatch(setUser(data));
                // console.log(data);
            } catch (err) {
                console.error("Error fetching the Cart", err);
            }
        }
        getRestaurantDetails();
        getCartDetails();
    }, [dispatch]);

    return (
        <div className={Styles["home-container"]}>
            <h1 className={Styles["home-heading"]}>Welcome, {userData.username}!</h1>
            {!isRestaurantFetched && <MySpinner />}
            {isRestaurantFetched && <AllRestaurants />}
        </div>
    );
};

export default Home;
