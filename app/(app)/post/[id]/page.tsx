import AllCommentsComponent from "@/components/AllCommentsComponent";
import CommentComponent from "@/components/CommentComponent";
import GeneralCenterComponent from "@/components/GeneralCenterComponent";
import LikeComponent from "@/components/LikeComponent";
import PostDetailsComponent from "@/components/PostDetailsComponent";
import { getUserFromToken } from "@/lib/auth";
import {
  getAllCommentsByContentId,
  getExactPostByContentId,
} from "@/lib/queries/post.queries";

import { cookies } from "next/headers";
import { FaRegCommentDots } from "react-icons/fa";

const ExactPost = async ({ params }: { params: { id: string } }) => {
  const postId = params.id;

  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    return <GeneralCenterComponent text={"You have to logged in "} />;
  }
  const user = await getUserFromToken(token);
  if (!user) {
    return <GeneralCenterComponent text={"You have to logged in "} />;
  }

  const post = await getExactPostByContentId(postId, user._id);
  const comments = await getAllCommentsByContentId(postId);

  return (
    <div className="bg-white rounded-lg p-4  custom-box-shadow-sm mt-6">
      <PostDetailsComponent post={post} />
      <div className="flex items-center gap-2 mt-5">
        <LikeComponent
          postId={post._id}
          userId={user._id}
          initialLiked={post.iLikedIt}
          initialLikesCount={post.likesCount}
        />
        <div className="flex gap-2 items-center">
          <p>{post.commentsCount}</p>{" "}
          <FaRegCommentDots className="text-xl cursor-pointer" />
        </div>
      </div>
      <CommentComponent postId={post._id} userId={user._id} />
      <AllCommentsComponent comments={comments} />
    </div>
  );
};

export default ExactPost;
