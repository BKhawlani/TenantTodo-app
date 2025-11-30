import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// ---------------- UPDATE PROFILE ----------------
export const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required." });
    }

    const updated = await prisma.user.update({
      where: { id: req.user.id },
      data: { 
          data: { name, email }
      }
    });

    return res.json({ user: updated });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed to update profile." });
  }
};



// ---------------- UPDATE PASSWORD ----------------
export const updatePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Fill both password fields." });
    }

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

    res.json({ message: "Password updated successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update password." });
  }
};


// ---------------- UPLOAD AVATAR ----------------
export const uploadAvatar = async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const url = `/uploads/${req.file.filename}`;

    const updated = await prisma.user.update({
      where: { id: req.user.id },
      data: { avatar: url }
    });

    res.json({ user: updated });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Upload failed" });
  }
};
