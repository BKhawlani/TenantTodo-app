import { Router } from "express";
import { adminMiddleware } from "../../middleware/admin.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();


router.delete("/users/:id", adminMiddleware, async (req, res) => {
  try {
    const userId = req.params.id;

    await prisma.user.delete({
      where: { id: userId }
    });

    res.json({ message: "User deleted successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to delete user" });
  }
});
router.get("/users", adminMiddleware, async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        tasks: true, 
      },
    });

    const usersWithCounts = users.map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,         // 🔥 مهم جداً
      createdAt: u.createdAt,
      taskCount: u.tasks.length,
    }));

    res.json(usersWithCounts);

  } catch (err) {
    console.log("ADMIN ERROR:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});


router.put("/users/:id/make-admin", adminMiddleware, async (req, res) => {
  try {
    const userId = req.params.id;

    const updated = await prisma.user.update({
      where: { id: userId },
      data: { role: "admin" },
    });

    res.json(updated);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to promote user" });
  }
});

router.put("/users/:id/remove-admin", adminMiddleware, async (req, res) => {
  try {
    const userId = req.params.id;

    const updated = await prisma.user.update({
      where: { id: userId },
      data: { role: "user" },
    });

    res.json(updated);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to remove admin role" });
  }
});


export default router;
