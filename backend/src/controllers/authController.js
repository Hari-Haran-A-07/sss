
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import asyncHandler from "express-async-handler";

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  if (
    typeof name !== "string" ||
    !name.trim() ||
    typeof email !== "string" ||
    !email.trim() ||
    typeof password !== "string" ||
    !password
  ) {
    return res.status(400).json({
      message: "Please fill all required fields",
    });
  }

  const normalizedEmail = email.trim().toLowerCase();

  const userExists = await User.findOne({
    email: normalizedEmail,
  });

  if (userExists) {
    return res.status(409).json({
      message: "User already exists",
    });
  }

  const user = await User.create({
    name: name.trim(),
    email: normalizedEmail,
    password,
    role,
  });

  return res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user._id),
  });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (
    typeof email !== "string" ||
    !email.trim() ||
    typeof password !== "string" ||
    !password
  ) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  const normalizedEmail = email.trim().toLowerCase();

  const user = await User.findOne({
    email: normalizedEmail,
  });

  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  return res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user._id),
  });
});
