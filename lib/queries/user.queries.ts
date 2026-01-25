import { connectDB } from "../db";
import { User } from "../models/User";
import { revalidatePath } from "next/cache";
import "../models";

export const getPersonProfile = async (userName: string) => {
  await connectDB();
  const profile = await User.findOne({ userName }).select("-password");
  return {
    _id: profile._id.toString(),
    firstName: profile.firstName,
    lastName: profile.lastName,
    userName: profile.userName,
    avatar: profile.avatar || null,
    email: profile.email,
    createdAt: profile.createdAt.toISOString(),
  };
};

export async function updateUserAvatar(userId: string, avatarUrl: string) {
  try {
    await connectDB();

    const result = await User.findByIdAndUpdate(
      userId,
      { avatar: avatarUrl },
      { new: true },
    );

    if (!result) {
      throw new Error("User not found");
    }

    revalidatePath(`"/[username]", "page"`);

    return result;
  } catch (error) {
    console.error("Failed to update avatar:", error);
    throw error;
  }
}
