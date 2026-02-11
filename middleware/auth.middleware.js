import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    const token =
      req.cookies?.token ||
      req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false, 
        message: "Authentication required"
      });
    }

    const t = process.env.JWT_SECRET || hellohello;

    const decoded = jwt.verify(token, t);

    req.user = decoded; // { id, role }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token"
    });
  }
};