import { Router } from "oak";
import authRoutes from "@/routes/auth.ts";
import bibleRoutes from "@/routes/bible.ts";

const router = new Router();

// Combine all route handlers
router.use("/auth", authRoutes);
router.use("/bible", bibleRoutes);

export default router;