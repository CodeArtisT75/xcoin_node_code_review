import mongoose from "mongoose";
import faker from "faker";
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
    name: faker.name.firstName(),
    nickname: faker.name.firstName(),
    email: faker.internet.email(),
    capital: faker.datatype.number({ min: 0, max: 1000 }),
    divisa: faker.random.word(),
    preferredCryptocurrency: faker.random.alpha({ count: 3, upcase: true }),
  });
  await profile.save();

  const simulator = new Simulator({
    profileId: profile.id,
    name: faker.random.word(),
    startDate: faker.date.recent(),
    checkDate: faker.date.recent(),
    cryptocurrency: faker.random.alpha({ count: 3, upcase: true }),
    cryptoPriceStart: faker.datatype.number({ min: 100, max: 1000 }),
    cryptoPriceCheck: faker.datatype.number({ min: 100, max: 1000 }),
  });
  await simulator.save();

  const favorite = new Favorite({
    profileId: profile.id,
    name: faker.random.word(),
    favorites: [
      faker.random.alpha({ count: 3, upcase: true }),
      faker.random.alpha({ count: 3, upcase: true }),
      faker.random.alpha({ count: 3, upcase: true }),
    ],
  });
  await favorite.save();

  await mongoose.disconnect();
})();
