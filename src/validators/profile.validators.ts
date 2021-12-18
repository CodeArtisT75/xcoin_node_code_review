import { body, query, ValidationChain } from "express-validator";

export const ProfileIndexValidator = (): ValidationChain[] => [
  query("page", "page must be number").isInt({ min: 1 }),
  query("perPage", "perPage must be integer and in range 1-100").isInt({
    min: 1,
    max: 100,
  }),
];

export const ProfileStoreValidator = (): ValidationChain[] => [
  body("email", "email is required and must be in correct format")
    .notEmpty()
    .isEmail(),
  body("name", "nickname is required and must be string").notEmpty().isString(),
  body("nickname", "name must be string").isString(),
];
