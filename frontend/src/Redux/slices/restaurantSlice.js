import { createSlice } from "@reduxjs/toolkit";

const initialState = []; // Start with an empty array

const restaurantSlice = createSlice({
    name: "restaurantReducer",
    initialState,
    reducers: {
        setRestaurants: (state, action) => {
            return action.payload; // Update state with new restaurants
        },
        getRestaurants: (state) => state, // Just return the current state
    },
});

export const { setRestaurants, getRestaurants } = restaurantSlice.actions;
export default restaurantSlice.reducer;
