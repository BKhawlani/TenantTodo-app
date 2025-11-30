import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmail } from "../../utils/sendEmail.js";

const prisma = new PrismaClient();

/**
 * Request password reset
 */
export const forgotPasswordService = async (email) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return "If the email exists, a reset link will be sent.";
  }

  const token = jwt.sign(
    { userId: user.id },
    process.env.RESET_SECRET,
    { expiresIn: "2m" }
  );

  const resetLink = `http://localhost:3000/reset-password?token=${token}`;

  await sendEmail(
    email,
    "Reset Your Password",
    `
      <h2>Password Reset Request</h2>
      <p>You requested to reset your password. Click below:</p>
      <p><a href="${resetLink}" target="_blank">Reset Password</a></p>
      <p>If you didn't request this, ignore this email.</p>
    `
  );

  return "A reset link has been sent to your email.";
};


/**
 * Reset user password
 */
export const resetPasswordService = async (token, newPassword) => {
  let decoded;

  try {
    decoded = jwt.verify(token, process.env.RESET_SECRET);
  } catch (err) {
    throw new Error("Invalid or expired token");
  }

  const userId = decoded.userId;

  // Hash password like registerUser
  const passwordHash = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id: userId },
    data: { passwordHash },
  });

  return "Password has been reset successfully.";
};
