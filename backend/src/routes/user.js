import express from "express";
import { postLogin, postSignup } from "../controller/user.js";
import upload from "../utils/multer.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";

const router = express.Router();

router.post("/signup", upload.single("image"), postSignup); // upload.single will run first....

router.post("/login", postLogin);

// router.post("/logout", postLogout);

export default router;
