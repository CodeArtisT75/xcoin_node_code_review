import mongoose, { Schema } from "mongoose";

const schema = new Schema(
  {
    profileId: {
      type: Schema.Types.ObjectId,
      ref: "Profile",
    },
    name: String,
    startDate: Date,
    checkDate: Date,
    dateRecorded: Date,
    cryptocurrency: String,
    cryptoPriceStart: Number,
    cryptoPriceCheck: Number,
    euros: Number,
    price: Number,
    quantity: Number,
  },
  {
    timestamps: true,
  }
);

export const Simulator = mongoose.model("Simulator", schema);
