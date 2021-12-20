import mongoose, { Schema } from "mongoose";

const schema = new Schema(
  {
    profileId: {
      type: Schema.Types.ObjectId,
      ref: "Profile",
    },
    name: String,
    favorites: [String],
  },
  {
    timestamps: true,
  }
);

export const Favorite = mongoose.model("Favorite", schema);
