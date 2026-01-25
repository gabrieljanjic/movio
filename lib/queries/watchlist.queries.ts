import { connectDB } from "../db";
import { Watchlist } from "../models/Watchlist";
import "../models";

export const getAllWatchlist = async (userId: string) => {
  await connectDB();
  const allWatchlist = await Watchlist.find({
    userId,
  }).populate("contentId");
  return allWatchlist;
};
