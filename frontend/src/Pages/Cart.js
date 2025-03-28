import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner"; // Import Spinner
import axios from "../Utils/axios.js";
import { setUser } from "../Redux/slices/userSlice";
import "./CSS/cart.css";
import Footer from "../Components/Footer.js";
import defaultImage from "../Assets/default-image.jpg";
const Cart = () => {
    const [loading, setLoading] = useState(true);
    const userData = useSelector((state) => state.userReducer);
    const cartItems = userData.cart || [];
    const dispatch = useDispatch();
    useEffect(() => {
        if (cartItems.length > 0 || userData.totalCartPrice !== undefined) {
            setLoading(false);
        }
    }, [cartItems, userData.totalCartPrice]);
    // for (let i of cartItems) {
    //     console.log(i.images);
    // }
    const removeHandler = async (foodId) => {
        try {
            const response = await axios.post("/cart/deleteFromCart", { foodId });
            if (response.status === 200) {
                dispatch(
                    setUser({
                        ...userData,
                        cart: response.data.user.cart,
                        totalCartPrice: response.data.user.totalCartPrice,
                    })
                );
            }
        } catch (error) {
            console.error("Error removing item:", error.response?.data || error);
        }
    };

    const increaseHandler = async (foodId) => {
        try {
            const response = await axios.post("/cart/increaseQuantity", { foodId });
            if (response.status === 200) {
                dispatch(
                    setUser({
                        ...userData,
                        cart: response.data.user.cart,
                        totalCartPrice: response.data.user.totalCartPrice,
                    })
                );
            }
        } catch (err) {
            console.error("Error increasing quantity:", err.response?.data || err);
        }
    };

    const decreaseHandler = async (foodId) => {
        try {
            const response = await axios.post("/cart/decreaseQuantity", { foodId });
            if (response.status === 200) {
                const updatedCart = response.data.user.cart;
                const updatedTotalPrice = response.data.user.totalCartPrice;
                const item = updatedCart.find((cartItem) => cartItem._id === foodId);
                if (!item || item.quantity === 0) {
                    await removeHandler(foodId);
                } else {
                    dispatch(
                        setUser({
                            ...userData,
                            cart: updatedCart,
                            totalCartPrice: updatedTotalPrice,
                        })
                    );
                }
            }
        } catch (err) {
            console.error("Error decreasing quantity:", err.response?.data || err);
        }
    };

    return (
        <>
            <Container className="cart-container">
                {loading ? (
                    <div className="spinner-container">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                ) : cartItems.length > 0 ? (
                    <>
                        <div className="checkout-section">
                            <h4>Total Price: ₹{userData.totalCartPrice}</h4>
                            <Button className="checkout-btn" size="lg">
                                Proceed to Checkout
                            </Button>
                            <button className="back-btn" onClick={() => window.history.back()}>
                                🔙 Back to Restaurants
                            </button>
                        </div>
                        <Row>
                            {cartItems.map((item, indx) => (
                                <Col key={indx} md={4} className="mb-4">
                                    <Card className="cart-item-card">
                                        <Card.Img
                                            variant="top"
                                            src={item.images.length > 0 ? item.images[0].url : defaultImage}
                                            alt={item.name}
                                        />
                                        <Card.Body>
                                            <Card.Title>{item.name}</Card.Title>
                                            <Card.Text>Price: ₹{item.price}</Card.Text>
                                            <Card.Text>Quantity: {item.quantity}</Card.Text>
                                            <div className="quantity-section">
                                                <Button
                                                    className="quantity-btn"
                                                    onClick={() => increaseHandler(item._id)}
                                                >
                                                    +
                                                </Button>
                                                <Button
                                                    className="quantity-btn"
                                                    onClick={() => decreaseHandler(item._id)}
                                                >
                                                    -
                                                </Button>
                                            </div>
                                            <Button className="remove-btn" onClick={() => removeHandler(item._id)}>
                                                Remove
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </>
                ) : (
                    <p className="empty-cart">Your cart is empty.</p>
                )}
            </Container>
            <Footer></Footer>
        </>
    );
};

export default Cart;
