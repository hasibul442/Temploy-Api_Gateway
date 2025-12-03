import { UserProfile } from "../../models/users/UserProfile.js";
import { UserCertification } from "../../models/users/UserCertification.js";
import { Users } from "../../models/users/Users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createOTP } from "../OtpService.js";

async function formatUserResponse(user) {

  const user_profile = await UserProfile.findOne({ user_id: user._id });

  return {
    user: {
      id: user._id,
      f_name: user.f_name,
      l_name: user.l_name,
      email: user.email,
      phone: user.phone,
      is_email_verified: user.is_email_verified,
      is_kyc_verified: user.is_kyc_verified,
      user_type: user.user_type,
      profile_image: user.profile_image,
      availability: user.availability,
      about: user_profile ? user_profile.about : null,
      address: user_profile ? user_profile.address : null,
      skills: user_profile ? user_profile.skills : [],
      hourly_rate: user_profile ? user_profile.hourly_rate : 0,
      service: user_profile ? user_profile.service : [],
      social_links: user_profile ? user_profile.social_links : [],
      certifications: user_profile ?  user_profile.certifications : [],
    },
  };
}

async function formatUserToken(token) {
  return {
    token: {
      token: token,
      expiresIn: 24 * 60 * 60 * 1000, // 1 day in milliseconds
      type: "Bearer",
    },
    auth_status: true,
  };
}

export async function userRegister(req) {
  try {
    const { email, phone, password } = req.body;
    const existingUser = await Users.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      if (existingUser.email === email) {
        throw new Error("This email already exists");
      }
      if (existingUser.phone === phone) {
        throw new Error("This phone already exists");
      }
    }

    const hased = await bcrypt.hash(password, 10);
    const newUser = await Users.create({
      ...req.body,
      password: hased,
    });
    // const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    //   expiresIn: "1d",
    // });
    
    await createOTP(email, newUser._id, "registration");

    return {
      ...(await formatUserResponse(newUser)),
      otpMsg : "An OTP has been sent to your email for verification."
    };
  } catch (error) {
    throw error;
  }
}

export async function userLogin(req) {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return { ...(await formatUserResponse(user)), ...(await formatUserToken(token)) };
  } catch (error) {
    throw error;
  }
}

export async function getUserProfile(req) {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    throw new Error("Unauthorized access");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Users.findById(decoded.id).select("-password");
    if (!user) {
      throw new Error("User not found");
    }
    return formatUserResponse(user);
  } catch (error) {
    throw new Error("Unauthorized access");
  }
}

export async function deleteUser(userId) {
  try {
    const user = await Users.findByIdAndDelete(userId);
    await UserProfile.findOneAndDelete({ user_id: userId });
    await UserCertification.deleteMany({ user_id: userId });

    if (!user) {
      throw new Error("User not found");
    }
    return { message: "User deleted successfully" };
  } catch (error) {
    throw error;
  }
}
