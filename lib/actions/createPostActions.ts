"use server";

import mongoose from "mongoose";
import { connectDB } from "../db";
import { Post } from "../models/Post";
import { revalidatePath } from "next/cache";
import { Like } from "@/lib/models/Like";

interface CreatePostInput {
  contentId: string;
  postContent: string;
  rating: number;
  createdBy: string;
}

export const createPostActions = async (data: CreatePostInput) => {
  const { contentId, postContent, rating, createdBy } = data;

  if (!contentId || !postContent) {
    throw new Error("All fields are required");
  }
  await connectDB();
  await Post.create({
    contentId,
    postContent,
    rating,
    createdBy: new mongoose.Types.ObjectId(createdBy),
  });
  revalidatePath(`/movies/${contentId}`);
};

export const likePostActions = async (postId: string, userId: string) => {
  try {
    await connectDB();
    const existingLike = await Like.findOne({ postId, userId });
    if (existingLike) {
      await Like.deleteOne({ postId, userId });
      revalidatePath(`/posts/${postId}`);
      return { success: true, action: "unliked" };
    } else {
      await Like.create({ postId, userId });
      revalidatePath(`/posts/${postId}`);
      return { success: true, action: "liked" };
    }
  } catch (err: any) {
    console.error("Like error:", err);
    throw new Error(err.message || "Failed to like post");
  }
};
