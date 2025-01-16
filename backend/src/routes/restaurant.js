import express from "express";
import { postCuisineCategoryAdd, postRestaurant } from "../controller/restaurant.js";
import upload from "../utils/multer.js";
const router = express.Router();

router.post("/add", upload.single("coverImage"), postRestaurant);
// for the upload middleware we have to include the image that we wanna upload

router.post('/cusine-category-add', postCuisineCategoryAdd);

export default router;
