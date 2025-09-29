import { Router } from "express";
import { authRoutes } from "./auth.routes.js";
import { userRoutes } from "./users.routes.js";
import { assetRoutes } from "./assets.routes.js";
import { categoryRoutes } from "./categories.routes.js";

export const routes = Router();

routes.use(authRoutes);
routes.use(userRoutes);
routes.use(assetRoutes);
routes.use(categoryRoutes);
