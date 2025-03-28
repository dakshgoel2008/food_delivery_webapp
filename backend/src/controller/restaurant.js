import Restaurant from "../models/restaurant.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import ErrorWrapper from "../utils/ErrorWrapper.js";
import uploadOnCloudinary from "../utils/uploadOnCloudinary.js";

export const postRestaurant = ErrorWrapper(async (req, res, next) => {
    const { name, address, contact } = req.body;
    const email = req.user?.email; // Ensure req.user exists before accessing email bro
    if (!email) {
        throw new ErrorHandler(401, "Please verify your email and try again", ["email"]);
    }

    const requiredFields = ["name", "address", "contact"];
    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
        throw new ErrorHandler(400, `Missing fields: ${missingFields.join(", ")}`, missingFields);
    }

    const existingRestaurant = await Restaurant.findOne({
        $or: [{ address }, { name }],
    });

    if (existingRestaurant) {
        throw new ErrorHandler(400, "Restaurant with the same name or address already exists", ["name", "address"]);
    }

    if (!req.file) {
        throw new ErrorHandler(400, "Restaurant cover image is required", ["coverImage"]);
    }

    let cloudinaryResponse;
    try {
        cloudinaryResponse = await uploadOnCloudinary(req.file.path);
    } catch (err) {
        throw new ErrorHandler(500, "Failed to upload image", [err.message]);
    }
    try {
        const newRestaurant = new Restaurant({
            name,
            address,
            email,
            contact,
            coverImage: cloudinaryResponse.secure_url,
            ownerId: req.user._id,
        });
        await newRestaurant.save().catch((err) => console.error("Mongoose Save Error:", err));

        res.status(200).json({
            success: true,
            message: "Restaurant added successfully",
            restaurant: newRestaurant,
        });
    } catch (err) {
        throw new ErrorHandler(500, "Unable to add Restaurant", [err.message]);
    }
});

export const postCuisineCategoryAdd = ErrorWrapper(async (req, res, next) => {
    const { categories, restaurant_name } = req.body;

    // if categories already exist add another one.
    if (!categories) {
        throw new ErrorHandler(400, "Please provide valid categories to add");
    }

    let newCuisineCategories = categories.split(",").map((c) => c.trim().toLowerCase()); // new CuisineCategories includes new CuisineCategories in lowercase
    if (newCuisineCategories.length == 0) {
        return res.status(400).json({ message: "No categories provided" });
    }
    try {
        const restaurant = await Restaurant.findOne({ name: restaurant_name });

        // only the authorised user can add the cuisines.
        if (restaurant.email !== req.user.email) {
            throw new ErrorHandler(401, "Unauthorized to add categories to this restaurant", ["email"]);
        }

        // if couldn't find the restaurant, throw an error
        if (!restaurant) {
            throw new ErrorHandler(400, "Restaurant not found, cannot add categories!");
        }

        // else do the work

        const existingCuisinesSet = new Set(restaurant.cuisines.map((c) => c.category)); // this will create the array of the existing categories

        // pull out the unique category names
        const uniqueCuisines = newCuisineCategories.filter((category) => !existingCuisinesSet.has(category));

        if (uniqueCuisines.length === 0) {
            return res.status(400).json({ message: "No new categories to add" });
        }

        // newCuisines that we have to add finally are these.
        const newCuisines = uniqueCuisines.map((category) => ({
            category: category,
            food: [],
        }));

        // directly update the cuisines object in restaurant.
        restaurant.cuisines = [...newCuisines, ...restaurant.cuisines];
        await restaurant.save().catch((err) => console.error("Mongoose Save Error:", err));
        res.status(200).json({
            message: "Categories added successfully!",
            data: restaurant,
        });
    } catch (err) {
        if (err instanceof ErrorHandler) {
            // Rethrow the specific error
            throw err;
        }
        throw new ErrorHandler(500, "Unable to add categories", err);
    }
});

export const postAddFoodItems = ErrorWrapper(async (req, res, next) => {
    const { category, name, description, price, restaurant_name, type } = req.body;

    const requiredFields = ["category", "name", "type", "description", "restaurant_name", "price"];
    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length > 0) {
        throw new ErrorHandler(401, `Missing fields: ${missingFields.join(", ")}`, missingFields);
    }
    try {
        const restaurant = await Restaurant.findOne({ name: restaurant_name.toLowerCase() });
        if (restaurant.email !== req.user.email) {
            throw new ErrorHandler(401, "Unauthorized to add categories to this restaurant", ["email"]);
        }
        if (!restaurant) {
            throw new ErrorHandler(400, "Restaurant not found");
        }
        // Check whether the cuisine intended to update is present in the restaurant or not.
        const cuisineSelected = restaurant.cuisines.find((c) => c.category === category.toLowerCase());
        if (!cuisineSelected) {
            throw new ErrorHandler(400, `Category '${category}' not found in the restaurant`);
        }
        const newFoodItem = {
            name,
            price,
            description,
            veg: type.toLowerCase() == "veg",
            images: [],
        };
        if (!req.file) {
            throw new ErrorHandler(400, "Food item image is required", ["image"]);
        }

        let cloudinaryResponse;
        try {
            cloudinaryResponse = await uploadOnCloudinary(req.file.path);
        } catch (err) {
            throw new ErrorHandler(500, "Failed to upload image", [err.message]);
        }
        newFoodItem.images.push({ url: cloudinaryResponse.secure_url });

        // check if the food item already exists or not.
        const foodExists = cuisineSelected.food.some(
            (food) => food.name.toLowerCase() === newFoodItem.name.toLowerCase()
        );
        if (foodExists) {
            throw new ErrorHandler(400, "This food item already exists");
        }
        cuisineSelected.food.push(newFoodItem);

        await restaurant.save().catch((err) => console.error("Mongoose Save Error:", err));
        res.status(200).json({
            message: "Food item added successfully",
            data: restaurant,
        });
    } catch (err) {
        if (err instanceof ErrorHandler) {
            // Rethrow the specific error
            throw err;
        }
        throw new ErrorHandler(500, "Unable to add food item", [err.message]);
    }
});

// CRUD Functionality.

export const postUpdateFoodItems = ErrorWrapper(async (req, res, next) => {
    const { id } = req.params; // id is used for aplying CRUD operations on the food item as it will be unique.
    const { category, name, description, price, restaurant_name, type } = req.body;

    try {
        const restaurant = await Restaurant.findOne({ name: restaurant_name });
        if (restaurant.email !== req.user.email) {
            throw new ErrorHandler(401, "Unauthorized to add categories to this restaurant", ["email"]);
        }
        if (!restaurant) {
            throw new ErrorHandler(400, "Restaurant not found");
        }

        // check for category is important as there may be same dish in 2 different categories
        const cuisineSelected = restaurant.cuisines.find((c) => c.category === category.toLowerCase());
        if (!cuisineSelected) {
            throw new ErrorHandler(400, `Category '${category}' not found in the restaurant`);
        }

        // check for food item using id.
        const foodItemIndex = cuisineSelected.food.findIndex((food) => food._id.toString() === id);
        if (foodItemIndex === -1) {
            throw new ErrorHandler(404, "Food item not found");
        }

        // update the food item
        const updatedFoodItem = {
            _id: cuisineSelected.food[foodItemIndex]._id,
            name,
            price,
            description,
            veg: type.toLowerCase() === "veg",
            images: cuisineSelected.food[foodItemIndex].images,
        };

        // upload the new image on cloudinary
        if (req.file) {
            const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
            updatedFoodItem.images.push({ url: cloudinaryResponse.secure_url });
        }

        // update the cuisine with updated item.
        cuisineSelected.food[foodItemIndex] = updatedFoodItem;
        await restaurant.save().catch((err) => console.error("Mongoose Save Error:", err));
        res.status(200).json({
            message: "Food item updated successfully",
            data: restaurant,
        });
    } catch (error) {
        if (error instanceof ErrorHandler) {
            throw error;
        }
        throw new ErrorHandler(500, "Unable to apply CRUD operations on food item", error);
    }
});

// function to just update the images means CRUD only but on images.
export const postAddAddFoodImage = ErrorWrapper(async (req, res, next) => {
    const { id } = req.params;
    const { category, restaurant_name } = req.body; // category means => cuisine type.
    try {
        const restaurant = await Restaurant.findOne({ name: restaurant_name });
        if (restaurant.email !== req.user.email) {
            throw new ErrorHandler(401, "Unauthorized to add food images to this restaurant", ["email"]);
        }
        if (!restaurant) {
            throw new ErrorHandler(400, "Restaurant not found");
        }
        // check for category is important as there may be same dish in 2 different categories
        const cuisineSelected = restaurant.cuisines.find((c) => c.category === category.toLowerCase());
        if (!cuisineSelected) {
            throw new ErrorHandler(400, `Category '${category}' not found in the restaurant`);
        }
        // check for food item using id.
        const foodItemIndex = cuisineSelected.food.findIndex((food) => food._id.toString() === id);
        if (foodItemIndex === -1) {
            throw new ErrorHandler(404, "Food item not found");
        }
        // upload the new image on cloudinary
        if (req.file) {
            const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
            cuisineSelected.food[foodItemIndex].images.push({ url: cloudinaryResponse.secure_url });
            await restaurant.save().catch((err) => console.error("Mongoose Save Error:", err));
        } else {
            throw new ErrorHandler(400, "No image provided");
        }
        res.status(200).json({
            message: "Food item image added successfully",
            data: restaurant,
        });
    } catch (err) {
        if (err instanceof ErrorHandler) {
            // Rethrow the specific error
            throw err;
        }
        throw new ErrorHandler(500, "Unable to add food item image", err);
    }
});

export const getDeleteFoodItems = ErrorWrapper(async (req, res, next) => {
    const { id } = req.params;
    const { category, restaurant_name } = req.query;
    try {
        const restaurant = await Restaurant.findOne({ name: restaurant_name });
        if (restaurant.email !== req.user.email) {
            throw new ErrorHandler(401, "Unauthorized to delete food items from this restaurant", ["email"]);
        }
        if (!restaurant) {
            throw new ErrorHandler(400, "Restaurant not found");
        }
        // check for category is important as there may be same dish in 2 different categories
        const cuisineSelected = restaurant.cuisines.find((c) => c.category === category.toLowerCase());
        if (!cuisineSelected) {
            throw new ErrorHandler(400, `Category '${category}' not found in the restaurant`);
        }
        // check for food item using id.
        const foodItemIndex = cuisineSelected.food.findIndex((food) => food._id.toString() === id);
        if (foodItemIndex === -1) {
            throw new ErrorHandler(404, "Food item not found");
        }
        // remove the food item from cuisine
        cuisineSelected.food.splice(foodItemIndex, 1);
        await restaurant.save();
        res.status(200).json({
            message: "Food item deleted successfully",
            data: restaurant,
        });
    } catch (error) {
        if (error instanceof ErrorHandler) {
            throw error;
        }
        throw new ErrorHandler(500, "Unable to delete food item", error);
    }
});

export const getGetFoodItems = ErrorWrapper(async (req, res, next) => {
    const { category, restaurant_name } = req.query;
    try {
        const restaurant = await Restaurant.findOne({ name: restaurant_name });
        if (restaurant.email !== req.user.email) {
            throw new ErrorHandler(401, "Unauthorized to get food items from this restaurant", ["email"]);
        }
        if (!restaurant) {
            throw new ErrorHandler(400, "Restaurant not found");
        }
        // check for category is important as there may be same dish in 2 different categories
        const cuisineSelected = restaurant.cuisines.find((c) => c.category === category.toLowerCase());
        if (!cuisineSelected) {
            throw new ErrorHandler(400, `Category '${category}' not found in the restaurant`);
        }
        res.status(200).json({
            message: "Food items retrieved successfully",
            data: cuisineSelected.food,
        });
    } catch (err) {
        if (err instanceof ErrorHandler) {
            // Rethrow the specific error
            throw err;
        }
        throw new ErrorHandler(500, "Unable to get food items", err);
    }
});

export const getGetParticularFoodItem = ErrorWrapper(async (req, res, next) => {
    const { id } = req.params;
    const { category, restaurant_name } = req.query;
    try {
        const restaurant = await Restaurant.findOne({ name: restaurant_name });
        if (restaurant.email !== req.user.email) {
            throw new ErrorHandler(401, "Unauthorized to get food items from this restaurant", ["email"]);
        }
        if (!restaurant) {
            throw new ErrorHandler(400, "Restaurant not found");
        }
        // check for category is important as there may be same dish in 2 different categories
        const cuisineSelected = restaurant.cuisines.find((c) => c.category === category.toLowerCase());
        if (!cuisineSelected) {
            throw new ErrorHandler(400, `Category '${category}' not found in the restaurant`);
        }
        // check for food item using id.
        const foodItemIndex = cuisineSelected.food.findIndex((food) => food._id.toString() === id);
        if (foodItemIndex === -1) {
            throw new ErrorHandler(404, "Food item not found");
        }
        res.status(200).json({
            message: "Food item retrieved successfully",
            data: cuisineSelected.food[foodItemIndex],
        });
    } catch (err) {
        if (err instanceof ErrorHandler) {
            // Rethrow the specific error
            throw err;
        }
        throw new ErrorHandler(500, "Unable to get food item", err);
    }
});

export const getGetAllCuisines = ErrorWrapper(async (req, res, next) => {
    const { restaurant_name } = req.query;
    try {
        const restaurant = await Restaurant.findOne({ name: restaurant_name });
        if (!restaurant) {
            throw new ErrorHandler(400, "Restaurant not found");
        }
        res.status(200).json({
            message: "Cuisines retrieved successfully",
            data: restaurant.cuisines,
        });
    } catch (err) {
        if (err instanceof ErrorHandler) {
            // Rethrow the specific error
            throw err;
        }
        throw new ErrorHandler(500, "Unable to get cuisines", err);
    }
});

export const getAllRestaurants = ErrorWrapper(async (req, res, next) => {
    try {
        const restaurants = await Restaurant.find({});
        res.status(200).json({
            message: "All Restaurants retrieved successfully",
            data: restaurants,
        });
    } catch (err) {
        if (err instanceof ErrorHandler) {
            // Rethrow the specific error
            throw err;
        }
        throw new ErrorHandler(500, "Unable to get restaurants", err);
    }
});

export const getRestaurantViaId = ErrorWrapper(async (req, res, next) => {
    const { id } = req.params;
    try {
        const restaurant = await Restaurant.findById(id);
        if (!restaurant) {
            throw new ErrorHandler(404, "Restaurant not found");
        }
        res.status(200).json({
            message: "Restaurant retrieved successfully",
            data: restaurant,
        });
    } catch (err) {
        if (err instanceof ErrorHandler) {
            // Rethrow the specific error
            throw err;
        }
        throw new ErrorHandler(500, "Unable to get restaurant", err);
    }
});

export const postAddReviews = ErrorWrapper(async (req, res, next) => {
    const { restaurant_name, rating, message } = req.body;
    const { name } = req.user;

    try {
        const restaurant = await Restaurant.findOne({ name: restaurant_name });
        if (!restaurant) {
            throw new ErrorHandler(400, "Restaurant not found");
        }
        if (restaurant.email !== req.user.email) {
            throw new ErrorHandler(401, "Unauthorized to add reviews", ["email"]);
        }
        if (Number(rating) < 1 || Number(rating) > 5) {
            throw new ErrorHandler(400, "Invalid rating. Rating should be between 1 and 5");
        }
        if (!restaurant.reviews) {
            restaurant.reviews = { list: [], images: [] };
        }
        const review = {
            username: name,
            rating: +rating,
            message: message,
            userId: req.user._id,
        };
        if (req.file) {
            const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
            if (!restaurant.reviews.images) {
                restaurant.reviews.images = [];
            }
            restaurant.reviews.images.push({ url: cloudinaryResponse.secure_url });
        }

        // Push review into reviews list
        restaurant.reviews.push(review);

        // Save updated restaurant
        await restaurant.save();

        res.status(201).json({
            message: "Review added successfully",
            data: restaurant,
        });
    } catch (err) {
        if (err instanceof ErrorHandler) {
            // Rethrow the specific error
            throw err;
        }
        throw new ErrorHandler(500, "Unable to add review", err);
    }
});

export const postUpdateReviews = ErrorWrapper(async (req, res, next) => {
    const { reviewId } = req.params;
    const { restaurant_name, rating, message } = req.body;
    const { name } = req.user;
    try {
        const restaurant = await Restaurant.findOne({ name: restaurant_name });
        if (!restaurant) {
            throw new ErrorHandler(400, "Restaurant not found");
        }
        if (restaurant.email !== req.user.email) {
            throw new ErrorHandler(401, "Unauthorized to update reviews", ["email"]);
        }
        if (Number(rating) < 1 || Number(rating) > 5) {
            throw new ErrorHandler(400, "Invalid rating. Rating should be between 1 and 5");
        }
        if (!restaurant.reviews) {
            restaurant.reviews = { list: [], images: [] };
        }
        const reviewIndex = restaurant.reviews.findIndex((review) => review._id.toString() === reviewId.toString());
        if (reviewIndex === -1) {
            throw new ErrorHandler(404, "Review Not found create new Review");
        }
        const review = {
            username: name,
            rating: +rating,
            message: message,
            userId: req.user._id,
        };
        if (req.file) {
            const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
            if (!restaurant.reviews.images) {
                restaurant.reviews.images = [];
            }
            restaurant.reviews.images.push({ url: cloudinaryResponse.secure_url });
        }

        // Push review into reviews list
        restaurant.reviews[reviewIndex] = review;

        // Save updated restaurant
        await restaurant.save();

        res.status(201).json({
            message: "Review updated successfully",
            data: restaurant,
        });
    } catch (err) {
        if (err instanceof ErrorHandler) {
            // Rethrow the specific error
            throw err;
        }
        throw new ErrorHandler(500, "Unable to add review", err);
    }
});

export const getDeleteReviews = ErrorWrapper(async (req, res, next) => {
    const { reviewId } = req.params;
    const { restaurant_name } = req.query;
    try {
        const restaurant = await Restaurant.findOne({ name: restaurant_name });
        if (!restaurant) {
            throw new ErrorHandler(400, "Restaurant not found");
        }
        if (restaurant.email !== req.user.email) {
            throw new ErrorHandler(401, "Unauthorized to delete reviews", ["email"]);
        }
        if (!restaurant.reviews) {
            restaurant.reviews = { list: [], images: [] };
        }
        const reviewIndex = restaurant.reviews.findIndex((review) => review._id.toString() === reviewId.toString());
        if (reviewIndex === -1) {
            throw new ErrorHandler(404, "Review not found");
        }
        restaurant.reviews.splice(reviewIndex, 1);
        await restaurant.save();
        res.status(200).json({
            message: "Review deleted successfully",
            data: restaurant,
        });
    } catch (err) {
        if (err instanceof ErrorHandler) {
            // Rethrow the specific error
            throw err;
        }
        throw new ErrorHandler(500, "Unable to delete review", err);
    }
});

export const getAllReviews = ErrorWrapper(async (req, res, next) => {
    const { restaurant_name } = req.body;
    try {
        const restaurant = await Restaurant.findOne({ name: restaurant_name });
        if (!restaurant) {
            throw new ErrorHandler(400, "Restaurant not found");
        }
        if (!restaurant.reviews) {
            restaurant.reviews = { list: [], images: [] };
        }
        res.status(200).json({
            message: "Reviews retrieved successfully",
            data: restaurant.reviews,
        });
    } catch (err) {
        if (err instanceof ErrorHandler) {
            // Rethrow the specific error
            throw err;
        }
        throw new ErrorHandler(500, "Unable to get reviews", err);
    }
});

export const getReview = ErrorWrapper(async (req, res, next) => {
    const { reviewId } = req.params;
    const { restaurant_name } = req.query;
    try {
        const restaurant = await Restaurant.findOne({ name: restaurant_name });
        if (!restaurant) {
            throw new ErrorHandler(400, "Restaurant not found");
        }
        if (!restaurant.reviews) {
            restaurant.reviews = { list: [], images: [] };
        }
        const reviewIndex = restaurant.reviews.findIndex((review) => review._id.toString() === reviewId.toString());
        if (reviewIndex === -1) {
            throw new ErrorHandler(404, "Review not found");
        }
        res.status(200).json({
            message: "Review retrieved successfully",
            data: restaurant.reviews[reviewIndex],
        });
    } catch (err) {
        if (err instanceof ErrorHandler) {
            // Rethrow the specific error
            throw err;
        }
        throw new ErrorHandler(500, "Unable to get review", err);
    }
});

export const postAddRestaurantImages = ErrorWrapper(async (req, res, next) => {
    const { restaurant_name } = req.body;
    console.log("files: ", req.files);
    try {
        const restaurant = await Restaurant.findOne({ name: restaurant_name });
        if (!restaurant) {
            throw new ErrorHandler(400, "Restaurant not found");
        }
        if (restaurant.email !== req.user.email) {
            throw new ErrorHandler(401, "Unauthorized to add images", ["email"]);
        }
        if (!restaurant.images) {
            restaurant.images = [];
        }
        const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
        restaurant.images.push({ url: cloudinaryResponse.secure_url });
        await restaurant.save();
        res.status(201).json({
            message: "Image added successfully",
            data: restaurant,
        });
    } catch (err) {
        if (err instanceof ErrorHandler) {
            // Rethrow the specific error
            throw err;
        }
        throw new ErrorHandler(500, "Unable to add image", err);
    }
});
