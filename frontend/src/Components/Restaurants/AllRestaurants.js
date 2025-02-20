import React from "react";
import { useSelector } from "react-redux";
import Restaurant from "./Restaurant";

const AllRestaurants = () => {
    const restaurantData = useSelector((state) => state.restaurantReducer);
    return (
        <div>
            {restaurantData.map((restaurant, indx) => (
                <Restaurant key={indx} restaurant={restaurant} />
            ))}
        </div>
    );
};

export default AllRestaurants;
