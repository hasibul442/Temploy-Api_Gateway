import { Employees } from "../../models/Employees.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

function formatEmployeeResponse(employee, token) {
  return {
    user: {
      id: employee._id,
      f_name: employee.f_name,
      l_name: employee.l_name,
      email: employee.email,
    },
    token: {
      token: token,
      expiresIn: 24 * 60 * 60 * 1000, // 1 day in milliseconds
      type: "Bearer",
    },
    auth_status: true,
  };
}

export async function empReg(req) {
  try {
    const { f_name, l_name, email, password } = req.body;
    const existing = await Employees.findOne({ email });
    if (existing) {
      throw new Error("This email already exists");
    }

    const hashed = await bcrypt.hash(password, 10);
    const newEmployee = await Employees.create({
      f_name,
      l_name,
      email,
      password: hashed,
    });

    const token = jwt.sign({ id: newEmployee._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return formatEmployeeResponse(newEmployee, token);
  } catch (error) {
    throw error;
  }
}

export async function empLogin(req) {
  try {
    const { email, password } = req.body;
    const employee = await Employees.findOne({ email });
    if (!employee) {
      throw new Error("Invalid email or password");
    }
    const isPasswordValid = await bcrypt.compare(password, employee.password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }
    const token = jwt.sign({ id: employee._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return formatEmployeeResponse(employee, token);
  } catch (error) {
    throw error;
  }
}

export async function empProfile(req) {

   const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        throw new Error("Unauthorized access");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const employee = await Employees.findById(decoded.id).select('-password');
        if (!employee) {
            throw new Error("Employee not found");
        }
        return {
            auth_status: true,
            data: employee
        };
    } catch (error) {
        throw error;
    }
}
