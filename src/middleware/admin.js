import jwt from "jsonwebtoken";

export const adminMiddleware = (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth) return res.status(401).json({ error: "Not authorized" });

  const token = auth.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.isAdmin) {
      return res.status(403).json({ error: "Admins only" });
    }
    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
};
