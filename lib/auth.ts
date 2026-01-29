import jwt from "jsonwebtoken";
import { User } from "@/lib/models/User";
import { connectDB } from "@/lib/db";

export const getUserFromToken = async (token: string) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
    id: string;
  };
  if (!decoded) return null;
  await connectDB();
  const rawUser = await User.findById(decoded.id).select(
    "_id firstName lastName userName avatar email createdAt",
  );
  if (!rawUser) return null;
  const user = {
    _id: rawUser._id.toString(),
    firstName: rawUser.firstName,
    lastName: rawUser.lastName,
    userName: rawUser.userName,
    avatar: rawUser.avatar,
    email: rawUser.email,
    createdAt: rawUser.createdAt.toISOString(),
  };
  return user;
};
