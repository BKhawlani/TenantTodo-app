import { registerUser, loginUser } from "./auth.service.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const user = await registerUser(name, email, password);

    res.json({
      message: "User registered successfully",
      user
    });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const result = await loginUser(email, password); // { user, token }

    res.json(result);
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(401).json({ error: err.message });
  }
};
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const me = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        role: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ user });

  } catch (err) {
    console.log("ME ERROR:", err);
    res.status(500).json({ error: "Failed to load user data" });
  }
};

