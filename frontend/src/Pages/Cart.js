import axios from "../Utils/axios.js";
import React, { useEffect, useState } from "react";
import Styles from "./CSS/home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../Redux/slices/cartSlice.js";
import MySpinner from "../Components/MySpinner.js";

const Cart = () => {
    const cartData = useSelector((state) => state.cartReducer);
    const dispatch = useDispatch();
    const [isCartFetched, setIsCartFetched] = useState(false);
    useEffect(() => {
        async function getCartDetails() {
            try {
                let { data } = await axios.get("/cart/view");
                dispatch(setCart(data.data));
                setIsCartFetched(true);
            } catch (err) {
                console.error("Error Fetching the Cart", err);
            }
        }
        getCartDetails();
    }, [dispatch]);
    return (
        <div className={Styles["home-container"]}>
            <h1 className={Styles["home-heading"]}>Welcome To Shopping cart!</h1>
            {!isCartFetched && <MySpinner />}
            
        </div>
    );
};

export default Cart;
