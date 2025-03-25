import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "../Utils/axios.js";
import { setUser } from "../Redux/slices/userSlice";
import "./CSS/cart.css";

const Cart = () => {
    const userData = useSelector((state) => state.userReducer);
    const cartItems = userData.cart || [];
    const dispatch = useDispatch();

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
        <Container className="cart-container">
            {cartItems.length > 0 && (
                <div className="checkout-section">
                    <h4>Total Price: ₹{userData.totalCartPrice}</h4>
                    <Button className="checkout-btn" size="lg">
                        Proceed to Checkout
                    </Button>
                </div>
            )}
            {cartItems.length === 0 ? (
                <p className="empty-cart">Your cart is empty.</p>
            ) : (
                <Row>
                    {cartItems.map((item, indx) => (
                        <Col key={indx} md={4} className="mb-4">
                            <Card className="cart-item-card">
                                <Card.Img variant="top" src={item.image} alt={item.name} />
                                <Card.Body>
                                    <Card.Title>{item.name}</Card.Title>
                                    <Card.Text>Price: ₹{item.price}</Card.Text>
                                    <Card.Text>Quantity: {item.quantity}</Card.Text>
                                    <div className="quantity-section">
                                        <Button className="quantity-btn" onClick={() => increaseHandler(item._id)}>
                                            +
                                        </Button>
                                        <Button className="quantity-btn" onClick={() => decreaseHandler(item._id)}>
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
            )}
        </Container>
    );
};

export default Cart;
