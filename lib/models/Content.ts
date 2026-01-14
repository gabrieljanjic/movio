import mongoose from "mongoose";

const ContentSchema = new mongoose.Schema({
  tmdbId: { type: Number, required: true, unique: true },
  type: { type: String, enum: ["movie", "tv"], required: true },
  title: { type: String, required: true },
  posterPath: { type: String },
  releaseYear: { type: Number },
  createdAt: { type: Date, default: () => new Date() },
});

export const Content =
  mongoose.models.Content || mongoose.model("Content", ContentSchema);
