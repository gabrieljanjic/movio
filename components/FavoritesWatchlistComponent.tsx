"use client";

import { FaEye, FaHeart, FaRegHeart, FaRegStickyNote } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import Tooltip from "./Tooltip";
import {
  addToFavorites,
  removeFromFavorites,
} from "@/lib/actions/favoritesActions";
import { toast } from "react-toastify";
import {
  addToWatchlist,
  removeFromWatchlist,
} from "@/lib/actions/watchlistActions";

const FavoritesWatchListComponent = ({
  wholeContent,
  isInFavorites,
  isInWatchlist,
}: {
  wholeContent: any;
  isInFavorites: boolean;
  isInWatchlist: boolean;
}) => {
  const handleAddFavorites = async () => {
    const res = await addToFavorites({ wholeContent });
    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };
  const handleRemoveFromFavorites = async () => {
    const res = await removeFromFavorites(wholeContent.id);
    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  const handleAddToWatchList = async () => {
    const res = await addToWatchlist({ wholeContent });
    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };
  const handleRemoveFromWatchList = async () => {
    const res = await removeFromWatchlist(wholeContent.id);
    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };
  return (
    <div className="flex gap-2 items-center">
      <div className="relative inline-block group bg-black/40 rounded-full cursor-pointer hover:scale-110 transition">
        <FaRegStickyNote className="text-white m-2" />
        <Tooltip text="Share your thoughts" />
      </div>
      {isInFavorites ? (
        <div
          className="relative inline-block group bg-black/40 rounded-full cursor-pointer hover:scale-110 transition"
          onClick={() => handleRemoveFromFavorites()}
        >
          <FaHeart className="text-white m-2" />
          <Tooltip text="Remove from favorites" />
        </div>
      ) : (
        <div
          className="relative inline-block group bg-black/40 rounded-full cursor-pointer hover:scale-110 transition"
          onClick={() => handleAddFavorites()}
        >
          <FaRegHeart className="text-white m-2" />
          <Tooltip text="Add to favorites" />
        </div>
      )}
      {isInWatchlist ? (
        <div
          className="relative inline-block group bg-black/40 rounded-full cursor-pointer hover:scale-110 transition"
          onClick={() => handleRemoveFromWatchList()}
        >
          <FaEye className="text-white m-2" />
          <Tooltip text="Remove from watch list" />
        </div>
      ) : (
        <div
          className="relative inline-block group bg-black/40 rounded-full cursor-pointer hover:scale-110 transition"
          onClick={() => handleAddToWatchList()}
        >
          <FiEye className="text-white m-2" />
          <Tooltip text="Add to watch list" />
        </div>
      )}
    </div>
  );
};

export default FavoritesWatchListComponent;
