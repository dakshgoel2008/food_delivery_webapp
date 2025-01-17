import mongoose from "mongoose";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import useRoutes from "./routes/user.js";
import restaurantRoutes from "./routes/restaurant.js";
import { verifyJWT } from "./middlewares/verifyJWT.js";

const PORT = process.env.PORT;
const app = express();
app.use(bodyParser.json({ limit: "4kb" }));

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);

app.use(bodyParser.urlencoded({ extended: true, limit: "4kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.use("/", useRoutes);

app.use("/restaurant", verifyJWT, restaurantRoutes); // first verify the JWT token before going to the restaurant router.

mongoose
    .connect(`${process.env.DB_PATH}/${process.env.DB_NAME}`)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Connected to DB: http://localhost:` + PORT);
        });
    })
    .catch((err) => {
        console.log("Database connection failed:", err);
    });
