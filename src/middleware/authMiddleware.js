import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function authMiddleware(req, res, next) {

  try {
    console.log("ME REQ USER:", req.user);

    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // احصل على بيانات المستخدم كاملة من قاعدة البيانات
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // حط بيانات المستخدم داخل req.user
    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
    };

    next();

  } catch (err) {
    console.log("AUTH MIDDLEWARE ERROR:", err);
    return res.status(401).json({ message: "Unauthorized" });
  }
}
