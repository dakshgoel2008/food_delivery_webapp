import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice.js";
import restaurantReducer from "../slices/restaurantSlice.js";
const store = configureStore({
    reducer: {
        userReducer: userReducer,
        restaurantReducer: restaurantReducer,
    },
});

export default store;
