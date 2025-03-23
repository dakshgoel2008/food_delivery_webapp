import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "",
    email: "",
    username: "",
    image: "",
    orderHistory: [],
    isLoggedIn: false,
};

const userSlice = createSlice({
    name: "userReducer",
    initialState,
    reducers: {
        setUser: (state, action) => {
            return { ...state, ...action.payload, isLoggedIn: true };
        },
        // logoutUser: () => initialState, // Reset state when logging out
    },
});

export const { setUser} = userSlice.actions;
export default userSlice.reducer;
