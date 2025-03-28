import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import FoodImageCarousel from "../Components/Restaurants/FoodImageCrousel";
import "./CSS/RestaurantPage.css";
import { Button } from "react-bootstrap";
import axios from "../Utils/axios.js";
import Footer from "./../Components/Footer";

const RestaurantPage = () => {
    const { restaurant_id } = useParams();
    const restaurants = useSelector((state) => state.restaurantReducer);
    const restaurant = restaurants.find((r) => r._id.toString() === restaurant_id);

    const [selectedFood, setSelectedFood] = useState(null);

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
        <>
            <div className={`restaurant-container ${selectedFood ? "blur-background" : ""}`}>
                <h1 className="restaurant-title">{restaurant.name}</h1>

                <FoodImageCarousel restaurant={restaurant} />

                <div className="restaurant-details">
                    <h2 className="Menu">🍽️ Menu</h2>
                    {restaurant.cuisines.map((data, indx) => (
                        <div key={indx} className="menu-category">
                            <h3>{data.category}</h3>
                            <ul className="food-list">
                                {data.food.map((item, indx2) => (
                                    <li key={indx2} className="food-item" onClick={() => setSelectedFood(item)}>
                                        <strong>{item.name}</strong> ₹{item.price}
                                        <Button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                cartAddHandler(item._id);
                                            }}
                                        >
                                            Add to cart
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                    <p className="restaurant-reviews">
                        <strong>Reviews:</strong> {restaurant.reviews}
                    </p>
                </div>

                <NavLink to="/app">
                    <button className="back-button">🔙 Back to Restaurants</button>
                </NavLink>

                {selectedFood && (
                    <div className="modal-overlay" onClick={() => setSelectedFood(null)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <h2>{selectedFood.name}</h2>
                            <p>
                                <strong>Price:</strong> ₹{selectedFood.price}
                            </p>
                            <p>
                                <strong>Description:</strong> {selectedFood.description}
                            </p>
                            <Button onClick={() => cartAddHandler(selectedFood._id)}>Add to Cart</Button>
                            <button className="close-button" onClick={() => setSelectedFood(null)}>
                                ✖
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default RestaurantPage;
