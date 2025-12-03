import {
  deleteUser,
  getUserProfile,
  otpVarification,
  userLogin,
  userRegister,
} from "../../services/auth/UserAuthServices.js";

export async function registration(req, res, next) {
  try {
    const responseData = await userRegister(req);
    res.status(200).json({
      status: 200,
      success: true,
      message: "User registered successfully",
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

export async function otpValidation(req, res, next) {
  try {
    const responseData = await otpVarification(req);
    res.status(200).json({
      status: 200,
      success: true,
      message: "OTP validated successfully",
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
    const responseData = await userLogin(req);
    res.status(200).json({
      status: 200,
      success: true,
      message: "User logged in successfully",
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
    const responseData = await getUserProfile(req);
    res.status(200).json({
      status: 200,
      success: true,
      message: "User profile fetched successfully",
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

export async function userDelete(req, res, next) {
  try {
    const responseData = await deleteUser(req.params.id);
    res.status(200).json({
      status: 200,
      success: true,
      ...responseData,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      success: false,
      message: error.message,
    });
  }
}
