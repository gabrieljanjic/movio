"use client";

import { likePostActions } from "@/lib/actions/postActions";
import { useState } from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";

const LikeComponent = ({
  postId,
  userId,
  initialLiked,
  initialLikesCount,
}: {
  postId: string;
  userId: string;
  initialLiked: boolean;
  initialLikesCount: number;
}) => {
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [likesCount, setLikesCount] = useState(initialLikesCount);

  const handleLike = async () => {
    const result = await likePostActions(postId, userId);
    if (result.action === "liked") {
      setIsLiked(true);
      setLikesCount((prev) => prev + 1);
    } else {
      setIsLiked(false);
      setLikesCount((prev) => prev - 1);
    }
  };

  return (
    <div className="flex items-center">
      <div className="flex gap-1 items-center ">
        <span className="text-sm text-gray-600">{likesCount}</span>
        <button onClick={handleLike} className="mr-4">
          {isLiked ? (
            <AiFillLike className="text-xl text-blue-500" />
          ) : (
            <AiOutlineLike className="text-xl" />
          )}
        </button>
      </div>
    </div>
  );
};

export default LikeComponent;
