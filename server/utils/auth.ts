import jwt from "jsonwebtoken";
// server\utils\auth.ts
import { H3Event } from "h3";
import User from "../models/User";

export const generateToken = (userId: string): string => {
  const config = useRuntimeConfig();
  return jwt.sign({ userId }, config.jwtSecret, { expiresIn: "7d" });
};

export const verifyToken = async (event: H3Event) => {
  const config = useRuntimeConfig();
  const token = getHeader(event, "Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw createError({
      statusCode: 401,
      message: "No token provided",
    });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret) as { userId: string };
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      throw createError({
        statusCode: 401,
        message: "User not found",
      });
    }

    return user;
  } catch (error) {
    throw createError({
      statusCode: 401,
      message: "Invalid token",
    });
  }
};
