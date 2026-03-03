import { Router } from "express";

import { signup, login, logout, getMe } from "../controllers/auth.controller.ts";
import { protectRoute } from "../middleware/protectRoute.ts";

const authRoutes = Router();

authRoutes.get("/me", protectRoute, getMe);
authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
authRoutes.post("/logout", logout);

export default authRoutes;