import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: () => new Date() },
  deletedAt: { type: Date },
});

export const Comment =
  mongoose.models.Comment || mongoose.model("Comment", CommentSchema);
