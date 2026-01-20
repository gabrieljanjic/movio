import { connectDB } from "../db";
import { Follow } from "../models/Follow";
import { Post } from "../models/Post";
import { Content } from "../models/Content";

export const getAllFollows = async (userId: string) => {
  await connectDB();
  const allFollowedUsers = await Follow.find({
    followerId: userId,
  }).populate("followingId");

  const followingIds = allFollowedUsers.map((follow) => follow.followingId._id);

  const posts = await Post.find({
    createdBy: { $in: followingIds },
  })
    .populate("createdBy", "firstName userName avatar")
    .populate("tmdbRefId")
    .sort({ createdAt: -1 });

  return posts;
};
