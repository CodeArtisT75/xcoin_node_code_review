import { query, param, ValidationChain, body } from "express-validator";
import mongoose from "mongoose";
import { Profile } from "../models/Profile";

export const SimulatorIndexValidator = (): ValidationChain[] => [
  query("page", "page must be number").optional().isInt({ min: 1 }),
  query("perPage", "perPage must be integer and in range 1-100")
    .optional()
    .isInt({
      min: 1,
      max: 100,
    }),
];

export const SimulatorsOfProfileIndexValidator = (): ValidationChain[] => [
  param("profileId").custom((value) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      return Promise.reject("id is not valid");
    }

    return true;
  }),
  query("page", "page must be number").optional().isInt({ min: 1 }),
  query("perPage", "perPage must be integer and in range 1-100")
    .optional()
    .isInt({
      min: 1,
      max: 100,
    }),
];

export const SimulatorStoreValidator = (): ValidationChain[] => [
  param("profileId")
    .custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return Promise.reject("id is not valid");
      }

      return true;
    })
    .custom((value) => {
      return Profile.findOne({ _id: value }).then((profile) => {
        if (!profile) {
          return Promise.reject("profile not exists");
        }
      });
    }),
  body("name", "name must be a valid string").notEmpty().isString(),
  body("startDate", "startDate must be a valid date").optional().isDate(),
  body("checkDate", "checkDate must be a valid date").optional().isDate(),
  body("dateRecorded", "dateRecorded must be a valid date").optional().isDate(),
  body("cryptocurrency", "cryptocurrency must be a valid string")
    .notEmpty()
    .isString(),
  body("cryptoPriceStart", "cryptoPriceStart must be a valid number")
    .optional()
    .isNumeric(),
  body("cryptoPriceCheck", "cryptoPriceCheck must be a valid number")
    .optional()
    .isNumeric(),
  body("euros", "euros must be a valid number").optional().isNumeric(),
  body("price", "price must be a valid number").optional().isNumeric(),
  body("quantity", "quantity must be a valid number")
    .optional()
    .isInt({ min: 0 }),
];
