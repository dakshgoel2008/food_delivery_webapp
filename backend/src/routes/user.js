import express from "express";
import { postSignup } from "../controller/user.js";
const router = express.Router();

router.post("/signup", postSignup);

// router.post("/login", postLogin);

export default router;
