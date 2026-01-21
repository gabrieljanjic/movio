import { connectDB } from "../db";
import { Follow } from "../models/Follow";
import { Post } from "../models/Post";

export const getAllFollows = async (userId: string, page: number) => {
  await connectDB();
  const limit = 10;
  const skip = (page - 1) * limit;
  const allFollowedUsers = await Follow.find({
    followerId: userId,
  }).populate("followingId");

  const followingIds = allFollowedUsers.map((follow) => follow.followingId._id);

  const total = await Post.countDocuments({
    createdBy: { $in: followingIds },
  });
  const totalPages = Math.ceil(total / limit);

  const posts = await Post.find({
    createdBy: { $in: followingIds },
  })
    .populate("createdBy", "firstName userName avatar")
    .populate("tmdbRefId")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  return {
    posts,
    pagination: {
      totalPages,
    },
  };
};
