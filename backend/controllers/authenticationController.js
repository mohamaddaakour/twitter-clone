import User from "../models/userModel.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

import bcrypt from "bcryptjs";

// function to add a new user (he didn't have an account yet)
async function signup(request, response) {
	try {
		const { fullName, username, email, password } = request.body;

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (!emailRegex.test(email)) {
			return response.status(400).json({ message: "Invalid email format" });
		}

		const existingUser = await User.findOne({ "username": username });
		if (existingUser) {
			return response.status(400).json({ message: "User is already taken" });
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword  = await bcrypt.hash(password, salt);

		// we create the new user document in the database with the hashed password not the plain text password
		const newUser = new User({
			fullName: fullName,
			username: username,
			email: email,
			password: hashedPassword
		});

		if (newUser) {
			// we add the user to the database
			await newUser.save();

			// genreate the token and the cookie
			generateTokenAndSetCookie(newUser._id, response);

			response.status(201).json({
				_id: newUser._id,
				fullName: newUser.fullName,
				username: newUser.username,
				email: newUser.email,
				followers: newUser.followers,
				following: newUser.following,
				profileImg: newUser.profileImage,
				coverImg: newUser.coverImage,
			});
		} else {
			response.status(400).json({ message: "Invalid user data" });
		}
	} catch (error) {
		console.log(`Error in sign up ${error.message}`);
		response.status(500).json({ message: "Internal server error" });
	}
}

export { signup };
