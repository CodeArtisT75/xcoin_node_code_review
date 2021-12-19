import { query, param, ValidationChain } from "express-validator";
import mongoose from "mongoose";

export const FavoriteIndexValidator = (): ValidationChain[] => [
  query("page", "page must be number").optional().isInt({ min: 1 }),
  query("perPage", "perPage must be integer and in range 1-100")
    .optional()
    .isInt({
      min: 1,
      max: 100,
    }),
];

export const FavoriteOfProfileIndexValidator = (): ValidationChain[] => [
  param("profileId").custom((value) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      return Promise.reject("id is not valid");
    }
  }),
];
