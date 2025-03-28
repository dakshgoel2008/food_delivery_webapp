import ErrorHandler from "../utils/ErrorHandler.js";
import ErrorWrapper from "../utils/ErrorWrapper.js";
import User from "./../models/user.js";
import Restaurant from "../models/restaurant.js";

export const getCart = ErrorWrapper(async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        res.json(user);
    } catch (error) {
        if (err instanceof ErrorHandler) {
            // Rethrow the specific error
            throw err;
        }
        throw new ErrorHandler(500, "Error retrieving the User", err);
    }
});
export const postAddToCart = ErrorWrapper(async (req, res, next) => {
    const user = await User.findById(req.user._id);
    const { restaurant_name, foodId } = req.body;
    const requiredFields = ["restaurant_name", "foodId"];
    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length > 0) {
        throw new ErrorHandler(401, `Missing fields: ${missingFields.join(", ")}`, missingFields);
    }
    try {
        const restaurant = await Restaurant.findOne({ name: restaurant_name });
        if (!restaurant) {
            throw new ErrorHandler(400, "Restaurant not found");
        }
        let foodItem;
        for (let category of restaurant.cuisines) {
            foodItem = category.food.find((food) => food._id.toString() == foodId);
            if (foodItem) break;
        }
        if (!foodItem) {
            throw new ErrorHandler(404, "Food item not found");
        }

        const existingFoodItem = user.cart.find((food) => food._id.toString() == foodId);
        if (existingFoodItem) {
            existingFoodItem.quantity += 1;
        } else {
            user.cart.push({
                _id: foodItem._id,
                name: foodItem.name,
                price: foodItem.price,
                images: [...foodItem.images],
                quantity: 1,
            });
        }
        user.totalCartPrice = user.cart.reduce((total, item) => total + item.price * item.quantity, 0);
        await user.save();
        res.status(200).json({
            message: "Item added to cart successfully",
            user: user,
        });
    } catch (err) {
        if (err instanceof ErrorHandler) {
            // Rethrow the specific error
            throw err;
        }
        throw new ErrorHandler(500, "Difficulty in adding to Cart", err);
    }
});

export const postDeleteFromCart = ErrorWrapper(async (req, res, next) => {
    const user = await User.findById(req.user._id); // Get the user
    const { foodId } = req.body; // Get the foodId from the request body

    // Validate required fields
    if (!foodId) {
        throw new ErrorHandler(400, "foodId is required");
    }
    try {
        if (user.cart.length === 0) {
            throw new ErrorHandler(400, "Cart is already empty");
        }

        //index of the food item in the cart
        const itemIndex = user.cart.findIndex((item) => item._id.toString() === foodId);
        // If the item is not found, throw an error
        if (itemIndex === -1) {
            throw new ErrorHandler(404, "Food item not found in cart");
        }

        // Remove the item from the cart
        user.cart.splice(itemIndex, 1);

        // totalCartPrice:
        user.totalCartPrice = user.cart.reduce((total, item) => total + item.price * item.quantity, 0);

        await user.save();

        // Send response
        res.status(200).json({
            message: "Item removed from cart successfully",
            user: user,
        });
    } catch (err) {
        if (err instanceof ErrorHandler) {
            // Rethrow the specific error
            throw err;
        }
        throw new ErrorHandler(500, "Difficulty in removing item from cart", err);
    }
});

export const postIncreaseQuantity = ErrorWrapper(async (req, res, next) => {
    const user = await User.findById(req.user._id);
    const { foodId } = req.body;
    const requiredFields = ["foodId"];
    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length > 0) {
        throw new ErrorHandler(401, `Missing fields: ${missingFields.join(", ")}`, missingFields);
    }
    try {
        const itemIndex = user.cart.findIndex((item) => item._id.toString() === foodId);
        if (itemIndex === -1) {
            throw new ErrorHandler(404, "Food item not found in cart");
        }
        user.cart[itemIndex].quantity += 1;
        user.totalCartPrice = user.cart.reduce((total, item) => total + item.price * item.quantity, 0);
        await user.save();
        res.status(200).json({
            message: "Quantity increased successfully",
            user: user,
        });
    } catch (err) {
        if (err instanceof ErrorHandler) {
            // Rethrow the specific error
            throw err;
        }
        throw new ErrorHandler(500, "Difficulty in increasing quantity", err);
    }
});

export const postDecreaseQuantity = ErrorWrapper(async (req, res, next) => {
    const user = await User.findById(req.user._id);
    const { foodId } = req.body;
    const requiredFields = ["foodId"];
    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length > 0) {
        throw new ErrorHandler(401, `Missing fields: ${missingFields.join(", ")}`, missingFields);
    }
    try {
        const itemIndex = user.cart.findIndex((item) => item._id.toString() == foodId);
        if (itemIndex === -1) {
            throw new ErrorHandler(404, "Food item not found in cart");
        }
        if (user.cart.length === 0) {
            throw new ErrorHandler(400, "Cart is already empty");
        }
        if (user.cart[itemIndex].quantity === 0) {
            throw new ErrorHandler(400, "Quantity cannot be decreased below 0");
        }
        user.cart[itemIndex].quantity -= 1;
        user.totalCartPrice = user.cart.reduce((total, item) => total + item.price * item.quantity, 0);
        await user.save();
        res.status(200).json({
            message: "Quantity decreased successfully",
            user: user,
        });
    } catch (err) {
        if (err instanceof ErrorHandler) {
            // Rethrow the specific error
            throw err;
        }
        throw new ErrorHandler(500, "Difficulty in decreasing quantity", err);
    }
});
