import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "",
    email: "",
    username: "",
    image: "",
    orderHistory: [],
    cart: [],
    totalCartPrice: 0,
    isLoggedIn: false,
};

const userSlice = createSlice({
    name: "userReducer",
    initialState,
    reducers: {
        setUser: (state, action) => {
            return {
                ...state,
                ...action.payload,
                cart: action.payload.cart || [],
                totalCartPrice: action.payload.totalCartPrice || 0,
                isLoggedIn: true,
            };
        },
        setCart: (state, action) => {
            return {
                ...state,
                cart: action.payload,
                totalCartPrice: action.payload.reduce((acc, item) => acc + item.price * item.quantity, 0),
            };
        },
        getCart: (state, action) => {
            return state.cart;
        },
    },
});

export const { setUser, setCart, getCart } = userSlice.actions;
export default userSlice.reducer;
