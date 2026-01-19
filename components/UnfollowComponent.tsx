"use client";

import { unfollowUser } from "@/lib/actions/userActions";
import { toast } from "react-toastify";

const UnfollowComponent = ({
  userId,
  myUsedId,
}: {
  userId: string;
  myUsedId: string;
}) => {
  const handleUnfollow = async () => {
    const res = await unfollowUser(userId, myUsedId);
    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };
  return (
    <button
      type="button"
      className="bg-red-500 text-white rounded py-1 px-2"
      onClick={() => handleUnfollow()}
    >
      - Unfollow
    </button>
  );
};

export default UnfollowComponent;
