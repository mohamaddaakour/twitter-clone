import jwt from "jsonwebtoken";

function generateTokenAndSetCookie(userId, response) {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: "15d",
	});

	response.cookie("jwt", token, {
		maxAge: 15 * 24 * 60 * 60 * 1000,

		// prevent XSS attacks cross-site scripting attacks
		httpOnly: true,

		// CSRF attacks cross-site request forgery attacks
		sameSite: "strict",

		secure: process.env.NODE_ENV !== "development",
	});
};

export default generateTokenAndSetCookie;
