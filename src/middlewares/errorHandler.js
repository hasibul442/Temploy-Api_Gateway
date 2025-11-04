import { response } from "express";

export function errorHandler(err, req, res, next) {
  console.error("🔥 Error:", err.message);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};


// Not found error response
export function notFound(req, res, next) {
  res.status(404).json({
    status: false,
    success: false,
    message: `Route not found - ${req.originalUrl}`,
    path: req.originalUrl,
  });
};