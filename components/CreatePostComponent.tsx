"use client";

import { useState } from "react";
import { createPostActions } from "@/lib/actions/postActions";
import Image from "next/image";
import Link from "next/link";

interface CreatePostComponentProps {
  contentId: string;
  user: any;
  title: string;
  contentType: "movie" | "tv";
  wholeContent: any;
}

const CreatePostComponent = ({
  contentId,
  user,
  title,
  contentType,
  wholeContent,
}: CreatePostComponentProps) => {
  const [postContent, setPostContent] = useState("");
  const [rating, setRating] = useState<number | "">("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleRatingChange = (value: number) => {
    if (value < 1) value = 1;
    if (value > 10) value = 10;
    setRating(value);
  };

  const handleCreatePost = async () => {
    if (!postContent || !rating) {
      setErrorMessage("Please fill all fields");
      return;
    }
    setLoading(true);
    try {
      await createPostActions({
        wholeContent,
        contentId,
        contentType,
        postContent,
        rating,
        createdBy: user._id,
      });
      setPostContent("");
      setRating("");
    } catch (err: any) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white border-y border-gray-200 rounded">
      <div className="flex items-center gap-3 mb-4">
        {user.avatar ? (
          <Image
            src={user.avatar}
            alt={user.userName}
            width={50}
            height={50}
            className="rounded-full"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-lg">
            {user.userName[0].toUpperCase()}
          </div>
        )}
        <div>
          <Link href={`/user/${user.userName}`} className="hover:underline">
            <p className="font-semibold text-gray-800">{user.firstName}</p>
          </Link>
          <p className="text-sm text-gray-500">{user.userName}</p>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <input
          type="number"
          min={1}
          max={10}
          className="w-32 border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Rating (1-10)"
          value={rating}
          onChange={(e) => handleRatingChange(Number(e.target.value))}
        />
        <textarea
          rows={5}
          className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Write your post..."
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
          onClick={handleCreatePost}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Post"}
        </button>
      </div>
    </div>
  );
};

export default CreatePostComponent;
