import {
  empLogin,
  empProfile,
  empReg,
} from "../../services/auth/EmployeeAuthService.js";

export async function registration(req, res, next) {
  try {
    const responseData = await empReg(req);
    res.status(200).json({
      status: 200,
      success: true,
      message: "Employee registered successfully",
      ...responseData,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      success: false,
      auth_status: false,
      message: error.message,
    });
  }
}

export async function login(req, res, next) {
  try {
    const responseData = await empLogin(req);
    res.status(200).json({
      status: 200,
      success: true,
      message: "Employee logged in successfully",
      ...responseData,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      success: false,
      auth_status: false,
      message: error.message,
    });
  }
}

export async function profile(req, res, next) {
  try {
    const responseData = await empProfile(req);
    res.status(200).json({
      status: 200,
      success: true,
      message: "Employee profile fetched successfully",
      ...responseData,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      success: false,
      auth_status: false,
      message: error.message,
    });
  }
}
