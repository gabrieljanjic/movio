import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  tmdbRefId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Content",
    required: true,
  },
  contentId: {
    type: String,
    required: true,
  },
  contentType: {
    type: String,
  },
  postContent: { type: String, required: true },
  rating: { type: Number },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: { type: Date, default: () => new Date() },
  deletedAt: { type: Date },
});

export const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);
