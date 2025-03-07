import { Router } from "https://deno.land/x/oak/mod.ts";
import authRoutes from "./auth.ts";

const router = new Router();

// Combine all route handlers
router.use("/auth", authRoutes);

export default router;
