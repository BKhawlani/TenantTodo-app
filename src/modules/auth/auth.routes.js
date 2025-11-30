import { Router } from "express";
import { register, login, me } from "./auth.controller.js";
import { authMiddleware } from "./auth.middleware.js";
import { forgotPassword, resetPassword } from "./password.controller.js";
import { adminMiddleware } from "../../middleware/admin.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authMiddleware, me);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/users", adminMiddleware, async (req, res) => {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" }
  });
  res.json(users);
});
export default router;
