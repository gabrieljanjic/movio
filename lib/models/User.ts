import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String },
  bio: { type: String },
  createdAt: { type: Date, default: () => new Date() },
});

export const User = mongoose.models.User || mongoose.model("User", UserSchema);
