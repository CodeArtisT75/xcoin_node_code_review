import { Router } from "express";
import { validationResult } from "express-validator";
import { Profile } from "../models/Profile";
import {
  ProfileIndexValidator,
  ProfileStoreValidator,
} from "../validators/profile.validators";
import logger from "../services/logger.service";

export const router = Router();

router.get("/api/v1/profiles", ProfileIndexValidator(), async (req, res) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return res.status(400).json({
      message: "validation error",
      errors: validationErrors.array({ onlyFirstError: true }),
    });
  }

  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 10;

  const profiles = await Profile.find()
    .limit(perPage)
    .skip(perPage * (page - 1))
    .lean();

  const total = await Profile.countDocuments().lean();
  const lastPage = Math.ceil(total / perPage);
  const meta = {
    page,
    perPage,
    lastPage,
    total,
  };

  res.json({ profiles, meta });
});

router.post("/api/v1/profiles", ProfileStoreValidator(), async (req, res) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return res.status(400).json({
      message: "validation error",
      errors: validationErrors.array({ onlyFirstError: true }),
    });
  }

  try {
    const { email, name, nickname } = req.body;

    let profile = await Profile.findOne({
      $or: [{ email }, { nickname }],
    }).exec();

    if (profile) {
      return res.status(400).json({ message: "profile exists" });
    }

    profile = await Profile.create({ name, email, nickname });

    res.status(201).json({ profile, message: "profile created" });
  } catch (e) {
    logger.error(e);
    res.status(500).json({ message: "profile didn't save" });
  }
});
