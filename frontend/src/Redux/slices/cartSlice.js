import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    cartItems: [],
    totalPrice: 0,
};

const cartSlice = createSlice({
    name: "cartReducer",
    initialState,
    reducers: {
        setCart: (state, action) => {
            return action.payload;
        },
        getCart: (state) => state,
    },
});

export const { setCart, getCart } = cartSlice.actions;
export default cartSlice.reducer;
