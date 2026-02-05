import mongoose from "mongoose";
import type { userDocument } from "../types/types.ts";
import { Model } from "mongoose";

const userSchema = new mongoose.Schema<userDocument>({
    username: {
        type: String,
        required: true,
        unique: true
    },
    fullname: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    email: {
        type: String,
        required: true
    },
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: []
        }
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: []
        }
    ],
    profileImage: {
        type: String,
        default: ""
    },
    coverImage: {
        type: String,
        default: ""
    },
    bio: {
        type: String,
        default: ""
    },
    likedPosts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
            default: []
        }
    ]
},
{ timestamps: true });

const userModel: Model<userDocument> = mongoose.models.User || mongoose.model("User", userSchema);

export default userModel;