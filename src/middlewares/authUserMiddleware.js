import jwt from "jsonwebtoken";
import { Users } from "../models/users/Users.js";

export async function authenticateUser(req, res, next) {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({
        status: 401,
        success: false,
        auth_status: false,
        message: "Access denied. Unauthorized.",
      });
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find user
    const user = await Users.findById(decoded.id).select("-password");
    
    if (!user) {
      return res.status(401).json({
        status: 401,
        success: false,
        auth_status: false,
        message: "Invalid token. User not found.",
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(403).json({
        status: 403,
        success: false,
        auth_status: false,
        message: "User account is inactive.",
      });
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        status: 401,
        success: false,
        auth_status: false,
        message: "Invalid token.",
      });
    }
    
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        status: 401,
        success: false,
        auth_status: false,
        message: "Token expired. Please login again.",
      });
    }

    return res.status(500).json({
      status: 500,
      success: false,
      message: "Authentication error occurred.",
    });
  }
}
