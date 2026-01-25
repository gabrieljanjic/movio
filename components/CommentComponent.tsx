"use client";

import { commentPostActions } from "@/lib/actions/postActions";
import { useState } from "react";
import { toast } from "react-toastify";

const CommentComponent = ({
  postId,
  userId,
}: {
  postId: string;
  userId: string;
}) => {
  const [message, setMessage] = useState("");

  const handleComment = async () => {
    try {
      const result = await commentPostActions(postId, userId, message);
      if (result.success) {
        setMessage("");
        toast.success("Comment successfully created");
      } else {
        toast.error("Something went wrong");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex gap-1 mt-3">
      <input
        type="text"
        name="comment"
        value={message}
        placeholder="Comment"
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        className="w-full border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        className="bg-blue-500 text-white px-3 rounded-lg"
        onClick={handleComment}
      >
        Post
      </button>
    </div>
  );
};

export default CommentComponent;
