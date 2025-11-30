import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes.js";
import taskRoutes from "./modules/task/task.routes.js";
import adminRoutes from "./modules/admins/admin.routes.js";
import profileRoutes from "./modules/profile/profile.routes.js";
import path from "path";
import dotenv from "dotenv";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/task", taskRoutes);
app.use("/admin", adminRoutes);
app.use("/profile", profileRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
dotenv.config();

export default app;
