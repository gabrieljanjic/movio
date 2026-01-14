import mongoose from "mongoose";

const WatchlistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  contentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Content",
    required: true,
  },
  createdAt: { type: Date, default: () => new Date() },
});

WatchlistSchema.index({ userId: 1, contentId: 1 }, { unique: true });

export const Watchlist =
  mongoose.models.Watchlist || mongoose.model("Watchlist", WatchlistSchema);
