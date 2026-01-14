import jwt from "jsonwebtoken";
import { User } from "@/lib/models/User";
import { connectDB } from "@/lib/db";

export const getUserFromToken = async (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };
    if (!decoded) return null;
    await connectDB();
    const rawUser = await User.findById(decoded.id).select(
      "firstName lastName _id"
    );

    const user = rawUser
      ? {
          firstName: rawUser.firstName,
          lastName: rawUser.lastName,
          _id: rawUser._id.toString(),
        }
      : null;
    return user;
  } catch (err) {
    return null;
  }
};
