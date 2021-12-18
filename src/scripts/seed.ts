import mongoose from "mongoose";
import { DateTime } from "luxon";
import { Profile } from "../models/Profile";
import { Simulator } from "../models/Simulator";
import { Favorite } from "../models/Favorite";
import { DBURL } from "../config";

(async () => {
  await mongoose.connect(DBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const profile = new Profile({
    name: `String`,
    nickname: `String`,
    email: `String`,
    capital: 123,
    divisa: `String`,
    preferredCryptocurrency: `String`,
  });
  await profile.save();

  const simulator = new Simulator({
    profileId: profile.id,
    name: `String`,
    startDate: DateTime.local(2021, 5, 1),
    checkDate: DateTime.local(2021, 5, 1),
    cryptocurrency: `String`,
    cryptoPriceStart: 123,
    cryptoPriceCheck: 123,
  });
  await simulator.save();

  const favorite = new Favorite({
    profileId: profile.id,
    name: `String`,
    favorites: [`String`, `String`, `String`],
  });
  await favorite.save();

  await mongoose.disconnect();
})();
