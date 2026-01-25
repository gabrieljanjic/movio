"use server";

import mongoose from "mongoose";
import { connectDB } from "../db";
import { Post } from "../models/Post";
import { revalidatePath } from "next/cache";
import { Like } from "@/lib/models/Like";
import { Comment } from "../models/Comment";
import { Content } from "../models/Content";
import { WholeContent } from "@/types/types";
import Error from "next/error";

type CreatePostInput = {
  wholeContent: WholeContent;
  contentId: string;
  postContent: string;
  rating: number;
  createdBy: string;
  contentType: "movie" | "tv";
};

export const createPostActions = async (data: CreatePostInput) => {
  const {
    wholeContent,
    contentId,
    postContent,
    rating,
    createdBy,
    contentType,
  } = data;
  if (!contentId || !postContent) {
    return;
  }
  await connectDB();

  let content = await Content.findOne({ tmdbId: contentId });

  if (!content) {
    const isMovie = contentType === "movie";
    content = await Content.create({
      tmdbId: contentId,
      contentType: contentType,
      overview: wholeContent.overview,
      posterPath: wholeContent.poster_path,
      title: isMovie ? wholeContent.title : wholeContent.name,
      voteAverage: wholeContent.vote_average,
      releaseDate: isMovie
        ? wholeContent.release_date
        : wholeContent.first_air_date,
    });
  }

  await Post.create({
    tmdbRefId: content._id,
    contentId: contentId,
    contentType,
    postContent,
    rating,
    createdBy: new mongoose.Types.ObjectId(createdBy),
  });
  if (contentType === "movie") {
    revalidatePath(`/movies/${contentId}`);
  } else {
    revalidatePath(`/series/${contentId}`);
  }
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

export const commentPostActions = async (
  postId: string,
  userId: string,
  message: string,
) => {
  try {
    await Comment.create({ postId, userId, message });
    revalidatePath(`/post/${postId}`);
    return { success: true };
  } catch (err) {
    if (err instanceof Error) {
      return { success: false };
    }
    return { success: false };
  }
};
