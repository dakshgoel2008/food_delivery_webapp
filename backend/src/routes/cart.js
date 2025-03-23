import express from "express";
// import upload from "../utils/multer.js";
import {
    getCart,
    postAddToCart,
    postDecreaseQuantity,
    postDeleteFromCart,
    postIncreaseQuantity,
} from "../controller/cart.js";

const router = express.Router();

router.get("/view", getCart);
router.post("/addToCart", postAddToCart);
router.post("/deleteFromCart", postDeleteFromCart);

router.post("/increaseQuantity", postIncreaseQuantity);
router.post("/decreaseQuantity", postDecreaseQuantity);

export default router;
