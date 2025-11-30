import { Router } from "express";
import multer from "multer";
import { authMiddleware } from "../auth/auth.middleware.js";
import { PrismaClient } from "@prisma/client";
import cloudinary from "../../utils/cloudinary.js";
import { sendEmail } from "../../utils/sendEmail.js";

const prisma = new PrismaClient();
const router = Router();

// إعداد رفع الملفات
const upload = multer({ dest: "uploads/" });

// ---------------- UPDATE PROFILE (name + email) ----------------
router.put("/update", authMiddleware, async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name?.trim()) {
      return res.status(400).json({ message: "Name cannot be empty" });
    }

    if (!email?.trim()) {
      return res.status(400).json({ message: "Email cannot be empty" });
    }

    // تحديث
    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        name: name.trim(),
        email: email.trim(),
      },
    });

    return res.json({ user });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed to update profile." });
  }
});


// ---------------- UPDATE PASSWORD ----------------
router.put("/update-password", authMiddleware, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Fill both password fields." });
    }

    const bcrypt = (await import("bcryptjs")).default;

    const user = await prisma.user.findUnique({
      where: { id: req.user.id }
    });

    const valid = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!valid) {
      return res.status(400).json({ message: "Wrong current password." });
    }

    const newHash = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: req.user.id },
      data: { passwordHash: newHash }
    });
await sendEmail(
  user.email,
  "Your Password Was Changed",
  `
    <h2>Hello ${user.name},</h2>
    <p>Your password was changed successfully.</p>
    <p>If you didn’t request this change, please reset your password immediately.</p>
    <br>
    <p>— TenantToDo Security Team</p>
  `
);

    return res.json({ message: "Password updated." });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error updating password." });
  }
});


// ---------------- UPLOAD AVATAR ----------------
router.put("/upload-avatar", authMiddleware, upload.single("avatar"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const uploaded = await cloudinary.uploader.upload(req.file.path, {
      folder: "tenantTodo/avatars",
    });

    const user = await prisma.user.update({
      where: { id: req.user.id },   // 👈 هنا
      data: { avatar: uploaded.secure_url }
    });

    res.json({ user });

  } catch (err) {
    console.log("CLOUDINARY ERROR:", err);
    res.status(500).json({ error: "Upload failed" });
  }
});

export default router;
