import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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

userSchema.pre("save", function (next) {
    if (!this.isModified("password")) return next(); // if the password of the user is changed then only change the password else do nothing
    const user = this;
    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    });
});

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password); // compare entered password with the hashed password in the database
};

userSchema.methods.generateRefreshToken = async function () {
    return jwt.sign(
        {
            userId: this._id,
        },
        process.env.REFRESH_TOKEN_KEY,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    );
};

userSchema.methods.generateAccessToken = async function () {
    return jwt.sign(
        {
            userId: this._id,
            email: this.email,
            username: this.username,
            name: this.name,
        },
        process.env.ACCESS_TOKEN_KEY,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    );
};

const User = mongoose.model("User", userSchema);

export default User;
