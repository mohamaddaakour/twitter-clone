import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.model.ts";
import type { IUser } from "../models/user.model.ts";
import { generateTokenAndSetCookie } from "../utils/generateToken.ts";
import { error } from "node:console";
// import { error } from "node:console";

// function to check the format of the email
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const signup = async (req: Request, res: Response) : Promise<void> => {
    try {
        const { fullName, username, email, password } = req.body as {
            fullName: string;
            username: string;
            email: string;
            password: string;
        };

        if (!isValidEmail(email)) {
            res.status(400).json({ error: "Invalid email format" });
            return;
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            res.status(400).json({ error: "Username is already taken" });
            return;
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            res.status(400).json({ error: "Email is already taken" });
            return;
        }

        if (password.length < 6) {
            res.status(400).json({ error: "Password must be at least 6 characters long" });
            return;
        }

        // we create the salt and the hashed password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            username,
            email,
            password: hashedPassword
        });

        // we save the document in the database
        await newUser.save();

        generateTokenAndSetCookie(String(newUser._id), res);

        res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      username: newUser.username,
      email: newUser.email,
      followers: newUser.followers,
      following: newUser.following,
      profileImg: newUser.profileImg,
      coverImg: newUser.coverImg,
    });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log(`Error in signup: ${error.message}`);
        } else {
            console.error(`Unknown error in sign up`);
        }
        res.status(500).json({ error: "Internal server error" });
    }
}

export const login = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { username, password } = req.body as {
            username: string;
            password: string;
        };

        if (!username || !password) {
            return res.status(400).json({ error: "username and password are required" });
        }

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // to compare the given password with the hashed one in the document
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        generateTokenAndSetCookie(String(user._id), res);

        return res.status(200).json({
			_id: user._id,
			fullName: user.fullName,
			username: user.username,
			email: user.email,
			followers: user.followers,
			following: user.following,
			profileImg: user.profileImg,
			coverImg: user.coverImg,
		});
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(`Login error: ${error.message}`);
        } else {
            console.error(`Unknwon error in the login`);
        }
        
        return res.status(500).json({ error: "Internal server error" });
    }
}

export const logout = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		res.cookie("jwt", "", {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			maxAge: 0,
		});

		return res
			.status(200)
			.json({ message: "Logged out successfully" });
	} catch (error) {
		console.error("Logout Error:", error);
		return res.status(500).json({ error: "Internal Server Error" });
	}
};

// function to get the info about specific user
export const getMe = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const user = await User.findById(userId).select("-password");
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.status(200).json(user);
  } catch (error: unknown) {
    console.error("Error in getMe controller:", error instanceof Error ? error.message : error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};