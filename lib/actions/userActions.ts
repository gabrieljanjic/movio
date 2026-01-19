"use server";
import { revalidatePath } from "next/cache";
import { connectDB } from "../db";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { error } from "console";
import { Follow } from "../models/Follow";

export const registerUser = async (formData: FormData) => {
  const firstName = formData.get("first-name") as string;
  const lastName = formData.get("last-name") as string;
  const userName = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!firstName || !lastName || !email || !password)
    throw new Error("All field are required");

  await connectDB();

  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    throw new Error("Email already exists");
  }
  const existingUsername = await User.findOne({ userName });
  if (existingUsername) {
    throw new Error("Username already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    firstName,
    lastName,
    userName,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });

  cookies().set("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60,
  });

  revalidatePath("/feed");
  return { firstName: user.firstName, lastName: user.lastName };
};

export const loginUser = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  if (!email || !password) throw new Error("Email and password required");
  await connectDB();

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid credentials");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });

  cookies().set("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60,
  });

  revalidatePath("/feed");
  return { firstName: user.firstName, lastName: user.lastName };
};

export const signoutUser = async () => {
  cookies().set("token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 0,
  });
  redirect("/feed");
};

export const updateUserBio = async (formData: any) => {
  try {
    await connectDB();

    const checkUserName = await User.findOne({
      userName: formData.userName,
    });
    if (checkUserName) {
      throw new Error("Username is already taken");
    }

    const checkEmail = await User.findOne({
      email: formData.email,
    });
    if (checkEmail) {
      throw new Error("Email is already taken");
    }

    const updatedUser = await User.findOneAndUpdate(
      {
        _id: formData._id,
      },
      {
        firstName: formData.firstName,
        lastName: formData.lastName,
        userName: formData.userName,
        email: formData.email,
      },
      { new: true },
    );
    console.log(updatedUser);
    revalidatePath(`/user/${updatedUser.userName}`);
    return { success: true, userName: updatedUser.userName };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
};

export const checkFollow = async (userId: string, myUsedId: string | null) => {
  if (!myUsedId || !userId) {
    return { success: false };
  }
  if (myUsedId === userId) {
    return { success: false };
  }
  const checkFollow = await Follow.findOne({
    followerId: myUsedId,
    followingId: userId,
  });
  if (checkFollow) {
    return { success: true };
  }
  return { success: false };
};

export const followUser = async (userId: string, myUsedId: string | null) => {
  try {
    await connectDB();
    if (!myUsedId || !userId) {
      return { success: false, message: "Something went wrong" };
    }
    if (myUsedId === userId) {
      return { success: false, message: "You can not follow yourself" };
    }

    const checkFollow = await Follow.findOne({
      followerId: myUsedId,
      followingId: userId,
    });

    if (checkFollow) {
      return { success: false, message: "You already follow that user" };
    }

    const revalidatePathUser = await User.findOne({ _id: userId });

    const newFollow = await Follow.create({
      followerId: myUsedId,
      followingId: userId,
    });
    revalidatePath(`user/${revalidatePathUser.username}`);
    return { success: true, message: "User successfully followed" };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
};

export const unfollowUser = async (userId: string, myUsedId: string | null) => {
  try {
    await connectDB();
    if (!myUsedId || !userId) {
      return { success: false, message: "Something went wrong" };
    }
    if (myUsedId === userId) {
      return { success: false, message: "You can not unfollow yourself" };
    }

    const checkFollow = await Follow.findOne({
      followerId: myUsedId,
      followingId: userId,
    });

    if (!checkFollow) {
      return { success: false, message: "You do not follow that user" };
    }

    const revalidatePathUser = await User.findOne({ _id: userId });

    const deleteFollow = await Follow.deleteOne({
      followerId: myUsedId,
      followingId: userId,
    });
    revalidatePath(`user/${revalidatePathUser.username}`);
    return { success: true, message: "User successfully unfollowed" };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
};
