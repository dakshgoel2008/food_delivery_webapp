import express from "express";
import {
    getDeleteFoodItems,
    getGetAllCuisines,
    getGetFoodItems,
    getGetParticularFoodItem,
    postAddFoodItems,
    postCuisineCategoryAdd,
    postRestaurant,
    postUpdateFoodItems,
} from "../controller/restaurant.js";
import upload from "../utils/multer.js";
const router = express.Router();

router.post("/register", upload.single("coverImage"), postRestaurant); // upload.single("")here we have to add that name which we
// are passing in postman.
// for the upload middleware we have to include the image that we wanna upload

router.post("/cusine-category-add", postCuisineCategoryAdd);

router.post("/add-food-items", upload.single("image"), postAddFoodItems);

router.post("/update-food-items/:id", upload.single("image"), postUpdateFoodItems);

router.get("/delete-food-items/:id", getDeleteFoodItems);

router.get("/get-food-items", getGetFoodItems); // will give all the food items of particular cuisine category

router.get("/get-food-item/:id", getGetParticularFoodItem); // used to get a particular food item using id.

router.get("/get-all-cuisines", getGetAllCuisines); //printing all cuisines of a particular restaurant

export default router;
