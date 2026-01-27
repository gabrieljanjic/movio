"use client";

import { useState } from "react";
import { createPostActions } from "@/lib/actions/postActions";
import Image from "next/image";
import Link from "next/link";
import { User, WholeContent } from "@/types/types";

type CreatePostComponentProps = {
  contentId: string;
  user: User;
  contentType: "movie" | "tv";
  wholeContent: WholeContent;
};

const CreatePostComponent = ({
  contentId,
  user,
  contentType,
  wholeContent,
}: CreatePostComponentProps) => {
  const [postContent, setPostContent] = useState("");
  const [rating, setRating] = useState<number | "">("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [spoiler, setSpoiler] = useState(false);

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
        spoiler,
        createdBy: user._id,
      });
      setPostContent("");
      setRating("");
      setSpoiler(false);
    } catch (err) {
      if (err instanceof Error) {
        return { success: false, message: err.message };
      }
      return { success: false, message: "Unknown error occurred" };
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white border-y border-gray-200 rounded">
      <div className="flex items-center gap-3 mb-4">
        {user.avatar ? (
          <div className="relative w-10 h-10 sm:w-12 sm:h-12">
            <Image
              src={user.avatar}
              alt={user.userName}
              fill
              className="rounded-full"
            />
          </div>
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
        <div className="flex items-center justify-between gap-2">
          <input
            type="number"
            min={1}
            max={10}
            className="w-32 border text-sm sm:text-base border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Rating (1-10)"
            value={rating}
            onChange={(e) => handleRatingChange(Number(e.target.value))}
          />
          <div className="flex gap-2 items-center mr-3">
            <p className="text-gray-800">Does this post contain spoilers?</p>
            <input
              type="checkbox"
              className="w-4 h-4"
              onChange={() => setSpoiler(!spoiler)}
            />
          </div>
        </div>
        <textarea
          rows={5}
          className="w-full border text-sm sm:text-base border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Write your post..."
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white py-1 md:py-2 px-2 md:px-4 rounded-md hover:bg-blue-600 transition"
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
