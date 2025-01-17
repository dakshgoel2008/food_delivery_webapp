import ErrorHandler from "../utils/ErrorHandler.js";
import ErrorWrapper from "../utils/ErrorWrapper.js";
import uploadOnCloudinary from "../utils/uploadOnCloudinary.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

export const postSignup = ErrorWrapper(async (req, res, next) => {
    const { username, email, password, name } = req.body;
    // to check for the missing fields.
    const requiredFields = ["email", "password", "username", "name"];
    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length > 0) {
        throw new ErrorHandler(401, `Details missing: ${missingFields.join(",")}`, missingFields);
    }

    // before uploading check if the user exists already or not.
    let existingUser = await User.findOne({
        $or: [{ email }, { username }],
    });
    if (existingUser) {
        throw new ErrorHandler(409, "Email or username already exists, Try entering new username or password", [
            "email",
            "username",
        ]);
    }

    // if user does not exist then upload on cloudinary server
    let cloudinaryResponse;
    try {
        cloudinaryResponse = await uploadOnCloudinary(req.file.path);
    } catch (err) {
        throw new ErrorHandler(500, "Failed to upload image", [err.message]);
    }

    // now since the user doesn't exist so create a new user
    try {
        const user = new User({
            username,
            email,
            password,
            name,
            image: cloudinaryResponse.secure_url,
        });
        await user.save(); // customised save that we created in the model -> `userSchema`.
        // this will save the encoded / hashed password

        const userObject = user.toObject();
        delete userObject.password;
        res.status(201).json({
            message: "User created successfully",
            user: userObject,
            success: true,
        });
    } catch (err) {
        throw new ErrorHandler(500, "Failed to create user", [err.message]);
    }
});

const generateAccessTokenAndRefreshToken = async (userId) => {
    try {
        let user = await User.findOne({
            _id: userId,
        });
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        // console.log(accessToken, refreshToken);
        return {
            accessToken,
            refreshToken,
        };
    } catch (err) {
        throw new ErrorHandler(500, "Failed to generate access and refresh tokens", [err.message]);
    }
};

export const postLogin = ErrorWrapper(async (req, res, next) => {
    const { email, password, username } = req.body;
    if (!username && !email) {
        throw new ErrorHandler(401, "You must provide either email or username", ["email", "username"]);
    }
    if (!password) {
        throw new ErrorHandler(401, "Password is required", ["password"]);
    }
    let user = await User.findOne({
        $or: [{ email }, { username }],
    });
    if (!user) {
        throw new ErrorHandler(401, "Invalid email or username or password", ["email", "username", "password"]);
    }

    // compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        throw new ErrorHandler(401, "Invalid email or username or password", ["email", "username", "password"]);
    }

    const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user._id);
    user.refreshToken = refreshToken;
    await user.save();

    user = await User.findOne({
        $or: [{ email }, { username }],
    }).select("-password -refreshToken");

    // console.log(user);
    res.status(200)
        .cookie("RefreshToken", refreshToken)
        .cookie("AccessToken", accessToken)
        .json({
            message: "Logged in successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                name: user.name,
                image: user.image,
            },
            success: true,
        });
});
