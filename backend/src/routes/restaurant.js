import express from "express";
import { postAddFoodItems, postCuisineCategoryAdd, postRestaurant } from "../controller/restaurant.js";
import upload from "../utils/multer.js";
const router = express.Router();

router.post("/register", upload.single("coverImage"), postRestaurant); // upload.single("")here we have to add that name which we
// are passing in postman.
// for the upload middleware we have to include the image that we wanna upload

router.post("/cusine-category-add", postCuisineCategoryAdd);

router.post("/add-food-items", upload.single("image"), postAddFoodItems);

export default router;
