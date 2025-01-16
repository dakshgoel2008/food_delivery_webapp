import express from "express";
import { postRestaurant } from "../controller/restaurant.js";
import upload from "../utils/multer.js";
const router = express.Router();

router.post("/add", upload.single("coverImage"), postRestaurant);
// for the upload middleware we have to include the image that we wanna upload

export default router;
