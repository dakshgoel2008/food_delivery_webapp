import Restaurant from "../models/restaurant.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import ErrorWrapper from "../utils/ErrorWrapper.js";
import uploadOnCloudinary from "../utils/uploadOnCloudinary.js";

export const postRestaurant = ErrorWrapper(async (req, res, next) => {
    const { name, address, email, contact } = req.body;
    const requiredFields = ["name", "address", "email", "contact"];
    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length > 0) {
        throw new ErrorHandler(
            401,
            `Missing fields: ${missingFields.join(", ")}`,
            missingFields
        );
    }
    
    const restaurant = await Restaurant.findOne({
        $or: [{ address }, { name }],
    });
    if (restaurant) {
        throw new ErrorHandler(
            400,
            "Restaurant with the same name or address already exists",
            ["name", "address"]
        );
    }
    let cloudinaryResponse;
    try {
        cloudinaryResponse = await uploadOnCloudinary(req.file.path);
    } catch (err) {
        throw new ErrorHandler(500, "Failed to upload image", [err.message]);
    }

    try {
        let newRestaurant = new Restaurant({
            name,
            address,
            email,
            contact,
            coverImage: cloudinaryResponse.secure_url,
        });
        await newRestaurant.save();
        res.status(200).json({
            success: true,
            message: "Restaurant added successfully",
            restaurant: newRestaurant,
        });
    } catch (err) {
        throw new ErrorHandler(500, "Unable to add Restaurant", err);
    }
});
