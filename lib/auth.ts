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
    "_id firstName lastName userName avatar",
  );
  if (!rawUser) throw new Error("User not found");
  const user = {
    firstName: rawUser.firstName,
    avatar: rawUser.avatar,
    lastName: rawUser.lastName,
    userName: rawUser.userName,
    _id: rawUser._id.toString(),
  };
  return user;
};
