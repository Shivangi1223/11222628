import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    longUrl: { type: String, required: true },
    shortcode: { type: String, required: true, unique: true },
    expiresAt: { type: Date },
    clicks: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Url", urlSchema);
