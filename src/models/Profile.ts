import mongoose, { Schema } from "mongoose";

const schema = new Schema(
  {
    name: String,
    nickname: String,
    email: String,
    capital: {
      type: Number,
      default: 0,
    },
    divisa: String,
    preferredCryptocurrency: String,
  },
  {
    timestamps: true,
  }
);

export const Profile = mongoose.model("Profile", schema);
