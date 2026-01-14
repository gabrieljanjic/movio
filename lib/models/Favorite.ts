import mongoose from "mongoose";

const FavoriteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  contentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Content",
    required: true,
  },
  createdAt: { type: Date, default: () => new Date() },
});

FavoriteSchema.index({ userId: 1, contentId: 1 }, { unique: true });

export const Favorite =
  mongoose.models.Favorite || mongoose.model("Favorite", FavoriteSchema);
