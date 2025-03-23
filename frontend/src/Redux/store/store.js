import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice.js";
import restaurantReducer from "../slices/restaurantSlice.js";
import cartReducer from "../slices/cartSlice.js";
const store = configureStore({
    reducer: {
        userReducer: userReducer,
        restaurantReducer: restaurantReducer,
        cartReducer: cartReducer,
    },
});

export default store;
