import { Router } from "express";
import { authMiddleware } from "../auth/auth.middleware.js";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask
} from "./task.controller.js";

const router = Router();

router.post("/", authMiddleware, createTask);
router.get("/", authMiddleware, getTasks);
router.put("/:id", authMiddleware, updateTask);
router.delete("/:id", authMiddleware, deleteTask);

export default router;
