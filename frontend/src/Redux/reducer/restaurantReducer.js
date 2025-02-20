const initialState = []; // Ensure initial state is an array

function restaurantReducer(state = initialState, action) {
    switch (action.type) {
        case "SET_RESTAURANTS":
            return action.payload; // Ensure payload is an array
        case "GET_RESTAURANTS":
            return state;
        default:
            return state;
    }
}

export default restaurantReducer;
