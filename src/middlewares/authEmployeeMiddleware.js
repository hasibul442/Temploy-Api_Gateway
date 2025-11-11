import jwt from "jsonwebtoken";
import { Employees } from "../models/Employees.js";

export async function authenticateEmployee(req, res, next) {
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
    
    // Find employee
    const employee = await Employees.findById(decoded.id).select("-password");
    
    if (!employee) {
      return res.status(401).json({
        status: 401,
        success: false,
        auth_status: false,
        message: "Invalid token. Employee not found.",
      });
    }

    // Attach employee to request object
    req.employee = employee;
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
