import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/ErrorHandler.js";

const restaurantSchema = new Schema(
    {
        name: {
            type: "String",
            lowercase: true,
            required: true,
            trim: true,
            unique: true,
        },
        address: {
            type: "String",
            lowercase: true,
            unique: true,
            required: true,
        },
        email: {
            type: "String",
            lowercase: true,
            required: true,
        },
        contact: {
            type: "String",
            required: true,
        },
        coverImage: {
            type: "String",
            required: true,
        },
        images: [
            // means Creating a array storing the url of the images.
            {
                url: "String",
            },
        ],
        ownerId: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        rating: Number,
        cuisines: [
            {
                category: {
                    type: "String",
                    lowercase: true,
                },
                food: [
                    {
                        name: String,
                        price: Number,
                        description: String,
                        veg: Boolean,
                        images: [
                            {
                                url: String,
                            },
                        ],
                    },
                ],
            },
        ],
        menu: [
            {
                imageUrl: String,
            },
        ],
        reviews: [
            {
                userId: {
                    type: mongoose.SchemaTypes.ObjectId,
                    ref: "User",
                },
                rating: {
                    type: Number,
                    default: 1,
                },
                images: [
                    {
                        url: String,
                    },
                ],
                message: {
                    type: String,
                },
                username: String,
            },
        ],
    },
    {
        timestamps: true,
    }
);

const restaurant = mongoose.model("Restaurant", restaurantSchema);

export default restaurant;
