import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        image: {
            type: String,
            required: false, // If image is optional
        },
        orderHistory: [
            {
                data: {
                    type: Date,
                    default: Date.now,
                },
                items: [
                    {
                        name: String,
                        price: Number,
                        quantity: Number,
                        id: {
                            type: Schema.Types.ObjectId,
                            ref: "Food", // Change this to the actual model reference
                        },
                    },
                ],
            },
        ],
        password: {
            type: String,
            required: true,
        },
        refreshToken: {
            type: String,
        },
    },
    {
        timestamps: true, // Enable timestamps
    }
);

const User = mongoose.model("User", userSchema);

export default User;
