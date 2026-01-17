import mongoose from "mongoose";

const ContentSchema = new mongoose.Schema({
  tmdbId: { type: Number, required: true, unique: true },
  contentType: { type: String, enum: ["movie", "tv"], required: true },
  title: { type: String, required: true },
  overview: { type: String },
  posterPath: { type: String },
  voteAverage: { type: Number },
  releaseDate: { type: String },
  createdAt: { type: Date, default: () => new Date() },
});

export const Content =
  mongoose.models.Content || mongoose.model("Content", ContentSchema);
