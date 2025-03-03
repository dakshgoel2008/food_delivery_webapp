import express from "express";
import { postLogin, postSignup } from "../controller/user.js";
import upload from "../utils/multer.js";

const router = express.Router();

router.post("/signup", upload.single("image"), postSignup); // upload.single will run first....

router.post("/login", postLogin);

export default router;
