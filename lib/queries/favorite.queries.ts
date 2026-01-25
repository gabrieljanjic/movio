import { connectDB } from "../db";
import { Favorite } from "../models/Favorite";
import "../models";

export const getAllFavorites = async (userId: string) => {
  await connectDB();
  const allFavorites = await Favorite.find({
    userId,
  }).populate("contentId");
  return allFavorites;
};
