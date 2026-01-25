import User from "../models/User.js";
import jwt from "jsonwebtoken";

export async function registerUser({ email, password }) {
  const exists = await User.findOne({email});

  if (exists) 
    return { ok: false, status: 400, message: "user already exists" };

  await User.create({ email, password });
  return { ok: true, status: 201, message: "User registered" };
}

export async function authenticateUser({ email, password }) {
  const user = await User.findOne({email});

  if (!user || user.password !== password) 
    return { ok: false, status: 401, message: "Invalid credentials" };

  const token = jwt.sign(
    {userId: user._id, email: user.email}, //payload by user
    process.env.JWT_SECRET,                // secret key 
    {expiresIn: process.env.JWT_EXPIRES_IN} //options 
      //header n sign is auto created 
  );

  return { ok: true, status: 200, message: "Login Successful", token };
}
