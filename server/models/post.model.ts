import mongoose from "mongoose";
import { Model } from "mongoose";

import type { postDocument } from "../types/types.ts";

const postSchema = new mongoose.Schema<postDocument>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    text: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: ""
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    comments: [
        {
            text: {
                type: String,
                required: true
            },
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true
            }
        }
    ]
}, { timestamps: true });

const postModel: Model<postDocument> = mongoose.models.Post || mongoose.model("Post", postSchema);

export default postModel;