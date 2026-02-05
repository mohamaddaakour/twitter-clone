import { Document, Types } from "mongoose";

interface userDocument extends Document {
    username: string;
    fullname: string;
    password: string;
    email: string;
    profileImage: string;
    coverImage: string;
    bio: string;
    followers: Types.ObjectId[];
    following: Types.ObjectId[];
    likedPosts: Types.ObjectId[];
}

interface comment {
    text: string;
    user: Types.ObjectId;
}

interface postDocument extends Document {
    user: Types.ObjectId;
    text: string;
    image: string;
    likes: Types.ObjectId[];
    comments: comment[];
}

interface notificationDocument extends Document {
    from: Types.ObjectId;
    to: Types.ObjectId;
    type: string;
    read: boolean;
}

export type { userDocument, postDocument, notificationDocument };