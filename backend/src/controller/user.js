import ErrorHandler from "../utils/ErrorHandler.js";
import User from "./../models/user.js";

export const postSignup = async (req, res, next) => {
    const { username, email, password, name } = req.body;
    // to check for the missing fields.
    const requiredFields = ["email", "password", "username", "name"];
    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length > 0) {
        throw new ErrorHandler(
            401,
            `Details missing: ${missingFields.join(",")}`
        );
    }
};
