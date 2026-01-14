import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  postId: { type: Number, required: true },
  userId: { type: Number, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date },
  deletedAt: { type: Date },
});

export const Comment =
  mongoose.models.Comment || mongoose.model("Comment", CommentSchema);
