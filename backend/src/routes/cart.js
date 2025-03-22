import express from "express";
// import upload from "../utils/multer.js";
import { getCart, postAddToCart, postDeleteFromCart } from "../controller/cart.js";

const router = express.Router();

router.get("/view", getCart);
router.post("/addToCart", postAddToCart);
router.post("/deleteFromCart", postDeleteFromCart);

// router.get("/increaseQuantity:id", getIncreaseQuantity);

export default router;
