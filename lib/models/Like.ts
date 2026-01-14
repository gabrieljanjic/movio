import mongoose from "mongoose";

const LikeSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: () => new Date() },
});

LikeSchema.index({ postId: 1, userId: 1 }, { unique: true });

export const Like = mongoose.models.Like || mongoose.model("Like", LikeSchema);
