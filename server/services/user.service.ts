import userModel from "../models/user.model.ts";

import type { userDocument } from "../types/types.ts";

const getUsersService = async (): Promise<userDocument[] | undefined> => {
    try {
        const users: userDocument[] = await userModel.find({});

        return users;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log(`Error: ${error.message}`);
        } else {
            console.log(`Unknown error getting the users`);
        }
    }
}

export { getUsersService };