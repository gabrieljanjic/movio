"use client";

import { followUser } from "@/lib/actions/userActions";
import { toast } from "react-toastify";

const FollowComponent = ({
  userId,
  myUsedId,
}: {
  userId: string;
  myUsedId: string;
}) => {
  const handleFollow = async () => {
    const res = await followUser(userId, myUsedId);
    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };
  return (
    <button
      type="button"
      className="bg-blue-500 text-sm md:text-base text-white rounded py-1 px-2"
      onClick={() => handleFollow()}
    >
      + Follow
    </button>
  );
};

export default FollowComponent;
