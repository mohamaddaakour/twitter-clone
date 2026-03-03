import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import User from "../models/user.model.ts";
import type { IUser } from "../models/user.model.ts";

interface AuthenticatedRequest extends Request {
    user?: IUser;
}

export const protectRoute = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const token = req.cookies?.jwt;

        if (!token) {
            res.status(401).json({ error: "Unauthorized: no token provided" });
            return;
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as JwtPayload & { userId: string };

        const user = await User.findById(decoded.userId).select("-password");
        
        if (!user) {
			res.status(401).json({ error: "Unauthorized: User not found" });
			return;
		}

        req.user = user;

        // continue to the next middleware
        next();
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(`Protect Route error: ${error.message}`);
        } else {
            console.error(`Unknwon error in protect route`);
        }

        res.status(401).json({ error: "Invalid or expired token" });
    }
}