import { connectDB } from "../db";
import { Watchlist } from "../models/Watchlist";
import { Content } from "../models/Content";

export const getAllWatchlist = async (userId: string) => {
  await connectDB();
  const allWatchlist = await Watchlist.find({
    userId,
  }).populate("contentId");
  return allWatchlist;
};
