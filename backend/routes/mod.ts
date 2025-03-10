import { Router } from "https://deno.land/x/oak/mod.ts";
import authRoutes from "./auth.ts";
import bibleRoutes from "./bible.ts";

const router = new Router();

// Combine all route handlers
router.use("/auth", authRoutes);
router.use("/bible", bibleRoutes);

export default router;