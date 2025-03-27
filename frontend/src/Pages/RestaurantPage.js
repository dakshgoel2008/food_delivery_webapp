import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import FoodImageCarousel from "../Components/Restaurants/FoodImageCrousel";
import "./CSS/RestaurantPage.css"; // Importing CSS file
import { Button } from "react-bootstrap";
import axios from "../Utils/axios.js";
import { setUser } from "../Redux/slices/userSlice";
const RestaurantPage = () => {
    const { restaurant_id } = useParams();
    const restaurants = useSelector((state) => state.restaurantReducer);
    const restaurant = restaurants.find((r) => r._id.toString() === restaurant_id);
    if (!restaurant) {
        return <h2 className="not-found">Restaurant Not Found</h2>;
    }
    const cartAddHandler = async (foodId) => {
        try {
            console.log(foodId);
            const response = await axios.post("/cart/addToCart", { foodId, restaurant_name: restaurant.name });
            console.log(response);
        } catch (err) {
            console.error("Error adding to cart:", err.response?.data || err);
        }
    };
    return (
        <div className="restaurant-container">
            <h1 className="restaurant-title">{restaurant.name}</h1>

            <FoodImageCarousel restaurant={restaurant} />

            <div className="restaurant-details">
                <h2>🍽️ Menu</h2>
                {restaurant.cuisines.map((data, indx) => (
                    <div key={indx} className="menu-category">
                        <h3>{data.category}</h3>
                        <ul className="food-list">
                            {data.food.map((item, indx2) => (
                                <li key={indx2} className="food-item">
                                    <strong>{item.name}</strong> - ₹{item.price} ({item.description})
                                    <Button onClick={() => cartAddHandler(item._id)}>Add to cart</Button>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
                <p className="restaurant-reviews">
                    <strong>Reviews:</strong> {restaurant.reviews}
                </p>
            </div>

            <NavLink to = "/app">
                <button className="back-button">🔙 Back to Restaurants</button>
            </NavLink>
        </div>
    );
};

export default RestaurantPage;
