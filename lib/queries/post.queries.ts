import { Post } from "@/lib/models/Post";
import { connectDB } from "../db";
import { Like } from "../models/Like";
import { Comment } from "../models/Comment";

export async function getPostsByContentId(
  contentId: number,
  userId: string,
  slice: boolean,
) {
  await connectDB();

  const posts = await Post.find({ contentId })
    .sort({ createdAt: -1 })
    /*.populate("tmdbRefId")*/
    .populate("createdBy", "userName avatar firstName")
    .lean();

  const postIds = posts.map((p: any) => p._id);

  const allLikes = await Like.find({
    postId: { $in: postIds },
  }).lean();
  const allComments = await Comment.find({
    postId: { $in: postIds },
  }).lean();

  const likedPostsIds = new Set<string>();
  const likesCountMap = new Map<string, number>();
  const commentsCountMap = new Map<string, number>();

  allLikes.forEach((like: any) => {
    const postIdStr = like.postId.toString();
    likesCountMap.set(postIdStr, (likesCountMap.get(postIdStr) || 0) + 1);
    if (like.userId.toString() === userId) {
      likedPostsIds.add(postIdStr);
    }
  });

  allComments.forEach((comment: any) => {
    const postIdStr = comment.postId.toString();
    commentsCountMap.set(postIdStr, (commentsCountMap.get(postIdStr) || 0) + 1);
  });

  const postsToMap = slice ? posts.slice(0, 3) : posts;

  return postsToMap.map((post: any) => {
    const postIdStr = post._id.toString();
    return {
      _id: postIdStr,
      postContent: post.postContent,
      rating: post.rating,
      createdAt: post.createdAt.toISOString(),
      createdBy: {
        _id: post.createdBy._id.toString(),
        userName: post.createdBy.userName,
        firstName: post.createdBy.firstName,
        avatar: post.createdBy.avatar,
      },
      iLikedIt: likedPostsIds.has(postIdStr),
      likesCount: likesCountMap.get(postIdStr) || 0,
      commentsCount: commentsCountMap.get(postIdStr) || 0,
    };
  });
}

export async function getExactPostByContentId(postId: string, userId: string) {
  await connectDB();
  const post = await Post.findOne({ _id: postId }).populate(
    "createdBy",
    "userName",
  );

  const didILikeIt = await Like.findOne({
    postId,
    userId,
  });

  const allLikes = await Like.find({
    postId,
  });
  let likesCounter = 0;
  allLikes.forEach(() => {
    likesCounter = likesCounter + 1;
  });

  const allComments = await Comment.find({
    postId,
  });
  let commentsCounter = 0;
  allComments.forEach(() => {
    commentsCounter = commentsCounter + 1;
  });

  return {
    _id: post._id.toString(),
    postContent: post.postContent,
    rating: post.rating,
    createdAt: post.createdAt.toISOString(),
    createdBy: {
      _id: post.createdBy._id.toString(),
      userName: post.createdBy.userName,
    },
    iLikedIt: !!didILikeIt,
    likesCount: likesCounter,
    commentsCount: commentsCounter,
  };
}

export async function getAllCommentsByContentId(postId: string) {
  await connectDB();
  const allComments = await Comment.find({ postId })
    .sort({ createdAt: -1 })
    .populate("userId", "userName _id");
  return allComments.map((comment: any) => ({
    _id: comment._id.toString(),
    user: {
      _id: comment.userId._id.toString(),
      userName: comment.userId.userName,
    },
    message: comment.message,
    createdAt: comment.createdAt.toISOString(),
  }));
}

export async function getAllPostsById(userId: string) {
  await connectDB();
  const posts = await Post.find({ createdBy: userId }).populate(
    "createdBy",
    "-password",
  );

  const postIds = posts.map((p: any) => p._id);
  const allLikes = await Like.find({
    postId: { $in: postIds },
  }).lean();
  const allComments = await Comment.find({
    postId: { $in: postIds },
  }).lean();
  const likedPostsIds = new Set<string>();
  const likesCountMap = new Map<string, number>();
  const commentsCountMap = new Map<string, number>();

  allLikes.forEach((like: any) => {
    const postIdStr = like.postId.toString();
    likesCountMap.set(postIdStr, (likesCountMap.get(postIdStr) || 0) + 1);
    if (like.userId.toString() === userId) {
      likedPostsIds.add(postIdStr);
    }
  });

  allComments.forEach((comment: any) => {
    const postIdStr = comment.postId.toString();
    commentsCountMap.set(postIdStr, (commentsCountMap.get(postIdStr) || 0) + 1);
  });

  return posts.map((post: any) => {
    const postIdStr = post._id.toString();
    return {
      _id: postIdStr,
      postContent: post.postContent,
      rating: post.rating,
      createdAt: post.createdAt.toISOString(),
      createdBy: {
        _id: post.createdBy._id.toString(),
        userName: post.createdBy.userName,
      },
      iLikedIt: likedPostsIds.has(postIdStr),
      likesCount: likesCountMap.get(postIdStr) || 0,
      commentsCount: commentsCountMap.get(postIdStr) || 0,
    };
  });
}
/*const allLikes = await Like.find({
    postId,
  });
  let likesCounter = 0;
  allLikes.forEach(() => {
    likesCounter = likesCounter + 1;
  });

  const allComments = await Comment.find({
    postId,
  });
  let commentsCounter = 0;
  allComments.forEach(() => {
    commentsCounter = commentsCounter + 1;
  }); */
