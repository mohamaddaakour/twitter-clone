import mongoose, { Model } from "mongoose";

import { notificationDocument } from "../types/types.ts";

const notificationSchema = new mongoose.Schema<notificationDocument>({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ["follow", "like"]
    },
    read: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const notificationModel: Model<notificationDocument> = mongoose.models.Notification || mongoose.model("Notification", notificationSchema);

export default notificationModel;