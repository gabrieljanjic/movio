import { connectDB } from "../db";
import "../models";
import { Comment } from "../models/Comment";
import { Follow } from "../models/Follow";
import { Like } from "../models/Like";
import { Post } from "../models/Post";

export const getAllFollows = async (userId: string, page: number) => {
  await connectDB();
  const limit = 10;
  const skip = (page - 1) * limit;

  const allFollowedUsers = await Follow.find({ followerId: userId }).populate(
    "followingId",
  );
  const followingIds = allFollowedUsers.map((follow) => follow.followingId._id);

  const total = await Post.countDocuments({
    createdBy: { $in: followingIds },
  });
  const totalPages = Math.ceil(total / limit);

  const posts = await Post.find({ createdBy: { $in: followingIds } })
    .populate("createdBy", "firstName userName avatar")
    .populate("tmdbRefId")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  const postIds = posts.map((p) => p._id);

  const allLikes = await Like.find({ postId: { $in: postIds } }).lean();
  const allComments = await Comment.find({ postId: { $in: postIds } }).lean();

  const likedPostsIds = new Set<string>();
  const likesCountMap = new Map<string, number>();
  const commentsCountMap = new Map<string, number>();

  allLikes.forEach((like) => {
    const postIdStr = like.postId.toString();
    likesCountMap.set(postIdStr, (likesCountMap.get(postIdStr) || 0) + 1);
    if (like.userId.toString() === userId) {
      likedPostsIds.add(postIdStr);
    }
  });

  allComments.forEach((comment) => {
    const postIdStr = comment.postId.toString();
    commentsCountMap.set(postIdStr, (commentsCountMap.get(postIdStr) || 0) + 1);
  });

  const mappedPosts = posts.map((post) => {
    const postIdStr = post._id.toString();
    return {
      _id: postIdStr,
      postContent: post.postContent,
      rating: post.rating,
      spoiler: post.spoiler,
      createdAt: post.createdAt.toISOString(),
      createdBy: {
        _id: post.createdBy._id.toString(),
        userName: post.createdBy.userName,
        firstName: post.createdBy.firstName,
        avatar: post.createdBy.avatar,
      },
      tmdbRefId: post.tmdbRefId,
      iLikedIt: likedPostsIds.has(postIdStr),
      likesCount: likesCountMap.get(postIdStr) || 0,
      commentsCount: commentsCountMap.get(postIdStr) || 0,
    };
  });

  return {
    posts: mappedPosts,
    pagination: { totalPages },
  };
};
