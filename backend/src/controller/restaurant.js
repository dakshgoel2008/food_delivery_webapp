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

export const postCuisineCategoryAdd = ErrorWrapper(async (req, res, next) => {
    const { categories, restaurant_name } = req.body;

    // if categories already exist add another one.
    if (!categories) {
        throw new ErrorHandler(400, "Please provide valid categories to add");
    }

    let newCuisineCategories = categories
        .split(",")
        .map((c) => c.trim().toLowerCase()); // new CuisineCategories includes new CuisineCategories in lowercase

    try {
        const restaurant = await Restaurant.findOne({ name: restaurant_name });

        // if couldn't find the restaurant, throw an error
        if (!restaurant) {
            throw new ErrorHandler(
                400,
                "Restaurant not found, cannot add categories!"
            );
        }

        // else do the work

        const existingCuisinesSet = new Set(
            restaurant.cuisines.map((c) => c.category)
        ); // this will create the array of the existing categories

        // pull out the unique category names
        const uniqueCuisines = newCuisineCategories.filter(
            (category) => !existingCuisinesSet.has(category)
        );

        if (uniqueCuisines.length === 0) {
            return res
                .status(400)
                .json({ message: "No new categories to add" });
        }

        // newCuisines that we have to add finally are these.
        const newCuisines = uniqueCuisines.map((category) => ({
            category: category,
            food: [],
        }));

        // directly update the cuisines object in restaurant.
        restaurant.cuisines = [...newCuisines, ...restaurant.cuisines];
        await restaurant.save();
        res.status(200).json({
            message: "Categories added successfully!",
            data: restaurant,
        });
    } catch (err) {
        throw new ErrorHandler(500, "Unable to add categories", err);
    }
});
