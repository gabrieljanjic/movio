"use client";

import { likePostActions } from "@/lib/actions/createPostActions";
import { useState } from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";

const LikeCommentComponent = ({
  postId,
  userId,
  initialLiked,
}: {
  postId: string;
  userId: string;
  initialLiked: boolean;
}) => {
  const [isLiked, setIsLiked] = useState(initialLiked);
  const handleLike = async () => {
    try {
      const result = await likePostActions(postId, userId);
      if (result.action === "liked") {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <div className="flex gap-3 mt-5">
      <button onClick={handleLike} className="disabled:opacity-50">
        {isLiked ? (
          <AiFillLike className="text-xl text-blue-500" />
        ) : (
          <AiOutlineLike className="text-xl" />
        )}
      </button>
      <FaRegCommentDots className="text-xl cursor-pointer" />
    </div>
  );
};

export default LikeCommentComponent;
