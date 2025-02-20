import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const RestaurantPage = () => {
    const { restaurant_id } = useParams();

    const restaurants = useSelector((state) => state.restaurantReducer);
    const restaurant = restaurants.find((r) => r._id.toString() === restaurant_id);
    // If restaurant not found
    if (!restaurant) {
        return <h2 style={{ textAlign: "center", color: "red" }}>Restaurant Not Found</h2>;
    }

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>{restaurant.name}</h1>
            <img src={restaurant.coverImage} alt={restaurant.name} style={styles.image} />

            <div style={styles.details}>
                <p>
                    <strong>🍽️ Cuisine:</strong> {restaurant.cuisine}
                </p>
                <p>
                    <strong>⭐ Rating:</strong> {restaurant.rating} / 5
                </p>
                <p>
                    <strong>💰 Price Range:</strong> {restaurant.priceRange}
                </p>
            </div>

            <button style={styles.backButton} onClick={() => window.history.back()}>
                🔙 Back to Restaurants
            </button>
        </div>
    );
};

const styles = {
    container: {
        textAlign: "center",
        padding: "20px",
        maxWidth: "600px",
        margin: "auto",
        border: "1px solid #ddd",
        borderRadius: "10px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    },
    title: {
        color: "#333",
        fontSize: "28px",
        marginBottom: "10px",
    },
    image: {
        width: "100%",
        height: "auto",
        borderRadius: "10px",
        marginBottom: "15px",
    },
    details: {
        textAlign: "left",
        padding: "0 20px",
        fontSize: "18px",
        lineHeight: "1.5",
    },
    backButton: {
        marginTop: "15px",
        padding: "10px 15px",
        backgroundColor: "#ff4d4d",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "16px",
    },
};

export default RestaurantPage;
