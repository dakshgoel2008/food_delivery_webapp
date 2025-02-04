import express from "express";
import {
    getAllRestaurants,
    getAllReviews,
    getDeleteFoodItems,
    getDeleteReviews,
    getGetAllCuisines,
    getGetFoodItems,
    getGetParticularFoodItem,
    getRestaurantViaId,
    getReview,
    postAddAddFoodImage,
    postAddFoodItems,
    postAddReviews,
    postCuisineCategoryAdd,
    postRestaurant,
    postUpdateFoodItems,
    postUpdateReviews,
} from "../controller/restaurant.js";
import upload from "../utils/multer.js";
const router = express.Router();

router.post("/register", upload.single("coverImage"), postRestaurant); // upload.single("")here we have to add that name which we
// are passing in postman.
// for the upload middleware we have to include the image that we wanna upload

router.post("/cusine-category-add", postCuisineCategoryAdd);

router.post("/add-food-items", upload.single("image"), postAddFoodItems);

//CRUD On FOOD ITEMS:
router.post("/update-food-items/:id", upload.single("image"), postUpdateFoodItems);
// FOOD ITEM IMAGE:
router.post("/add-food-images/:id", upload.single("image"), postAddAddFoodImage);

router.get("/delete-food-items/:id", getDeleteFoodItems);

router.get("/get-food-items", getGetFoodItems); // will give all the food items of particular cuisine category

router.get("/get-food-item/:id", getGetParticularFoodItem); // used to get a particular food item using id.

router.get("/get-all-cuisines", getGetAllCuisines); //printing all cuisines of a particular restaurant

router.get("/all", getAllRestaurants);
router.get("/:id", getRestaurantViaId);

// REVIEWS HANDLER.
router.post("/add-review", upload.single("image"), postAddReviews);
router.post("/update-review/:reviewId", upload.single("image"), postUpdateReviews);
router.get("/delete-review/:reviewId", getDeleteReviews);
// router.get("/get-all-reviews", getAllReviews);
router.post("/reviews", getAllReviews);
router.get("/get-review/:reviewId", getReview);

export default router;
