import { Post } from "@/lib/models/Post";
import { connectDB } from "../db";
import { Like } from "../models/Like";

export async function getPostsByContentId(contentId: number, userId: string) {
  await connectDB();

  const posts = await Post.find({ contentId })
    .populate("createdBy", "firstName")
    .lean();

  const postIds = posts.map((p: any) => p._id);
  const usersLikes = await Like.find({
    postId: { $in: postIds },
    userId: userId,
  }).lean();

  const likedPostsIds = new Set(
    usersLikes.map((like: any) => like.postId.toString())
  );

  return posts.map((post: any) => ({
    _id: post._id.toString(),
    postContent: post.postContent,
    rating: post.rating,
    createdAt: post.createdAt.toISOString(),
    createdBy: {
      id: post.createdBy._id.toString(),
      firstName: post.createdBy.firstName,
    },
    isLikedByUser: likedPostsIds.has(post._id.toString()),
  }));
}
