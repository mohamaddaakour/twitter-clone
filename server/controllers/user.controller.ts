import userModel from "../models/user.model.ts";
import type { Response, Request } from "express";

import { getUsersService } from "../services/user.service.ts";

import type { userDocument } from "../types/types.ts";

const getUsers = async (req: Request, res: Response): Promise<Response | undefined> => {
    try {
        const users: userDocument[] | undefined = await getUsersService();

        return res.status(200).json({ success: true, message: users });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log(`Error: ${error.message}`);
        } else {
            console.log(`Unknown error getting the users`);
        }
        res.status(500).json({ success: false, message: "Cannot find users" });
    }
}

export { getUsers };