import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

/**
 * Register new user
 */
export const registerUser = async (name, email, password) => {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    throw new Error("Email already registered");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
      role: "user",
    }
  });

  return user;
};

/**
 * Login user and return token
 */
export const loginUser = async (email, password) => {
  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) throw new Error("Invalid email or password");

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) throw new Error("Invalid email or password");

  const token = jwt.sign(
    {
      name:user.name,
      userId: user.id,
      email: user.email,
      role: user.role,     // 🔥 مهم جداً
      isAdmin: user.role === "admin",  // 🔥 الجديد
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return { user, token, isAdmin: user.role === "admin" };
};

