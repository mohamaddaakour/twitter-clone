import {Document, Schema, Model, model, Types} from "mongoose";

export interface IUser extends Document {
    username: string;
    fullName: string;
    password: string;
    email: string;
    followers: Types.ObjectId[];
    following: Types.ObjectId[];
    profileImg?: string;
    coverImg?: string;
    bio?: string;
    link?: string;
    likedPosts: Types.ObjectId[];
    createAt: Date;
    updateAt: Date;
}

const userSchema: Schema<IUser> = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true, trim: true },
    fullName: { type: String, required: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },

    followers: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
    following: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],

    profileImg: { type: String, default: "" },
    coverImg: { type: String, default: "" },
    bio: { type: String, default: "" },
    link: { type: String, default: "" },

    likedPosts: [{ type: Schema.Types.ObjectId, ref: "Post", default: [] }],
  },
  { timestamps: true }
);

const User: Model<IUser> = model<IUser>("User", userSchema);

export default User;