import { Router } from "express";
import { Favorite } from "../models/Favorite";
import { validationResult } from "express-validator";
import {
  FavoriteIndexValidator,
  FavoriteOfProfileIndexValidator,
} from "../validators/favorite.validators";

export const router = Router();

router.get("/api/v1/favorites", FavoriteIndexValidator(), async (req, res) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return res.status(400).json({
      message: "validation error",
      errors: validationErrors.array({ onlyFirstError: true }),
    });
  }

  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 10;

  const favorites = await Favorite.find()
    .limit(perPage)
    .skip(perPage * (page - 1))
    .lean();

  const total = await Favorite.countDocuments().lean();
  const lastPage = Math.ceil(total / perPage);
  const meta = {
    page,
    perPage,
    lastPage,
    total,
  };

  // console.log(favorite);

  res.json({ favorites, meta });
});

router.get(
  "/api/v1/favorites/:profileId",
  FavoriteOfProfileIndexValidator(),
  async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json({
        message: "validation error",
        errors: validationErrors.array({ onlyFirstError: true }),
      });
    }

    // console.log(req.params);

    const { profileId } = req.params;
    const query = { profileId };

    // console.log(query);

    const favorites = await Favorite.find(query).select(["-profileId"]).lean();

    res.json({ favorites });
  }
);
