import { Router } from "express";
import { validationResult } from "express-validator";
import { Simulator } from "../models/Simulator";
import {
  SimulatorIndexValidator,
  SimulatorsOfProfileIndexValidator,
  SimulatorStoreValidator,
} from "../validators/simulator.validators";

export const router = Router();

router.get(
  "/api/v1/simulators",
  SimulatorIndexValidator(),
  async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json({
        message: "validation error",
        errors: validationErrors.array({ onlyFirstError: true }),
      });
    }

    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;

    const simulators = await Simulator.find()
      .limit(perPage)
      .skip(perPage * (page - 1))
      .lean();

    const total = await Simulator.countDocuments().lean();
    const lastPage = Math.ceil(total / perPage);
    const meta = {
      page,
      perPage,
      lastPage,
      total,
    };

    // console.log(simulator);

    res.json({ simulators, meta });
  }
);

router.get(
  "/api/v1/simulators/:profileId",
  SimulatorsOfProfileIndexValidator(),
  async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json({
        message: "validation error",
        errors: validationErrors.array({ onlyFirstError: true }),
      });
    }

    // console.log("========== ");

    const { profileId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;

    // console.log({ profileId });

    const query = { profileId };

    const simulators = await Simulator.find(query)
      .select(["-profileId"])
      .limit(perPage)
      .skip(perPage * (page - 1));

    const total = await Simulator.countDocuments(query).lean();
    const lastPage = Math.ceil(total / perPage);
    const meta = {
      page,
      perPage,
      lastPage,
      total,
    };

    res.json({ simulators, meta });
  }
);

router.post(
  "/api/v1/simulators/:profileId",
  SimulatorStoreValidator(),
  async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json({
        message: "validation error",
        errors: validationErrors.array({ onlyFirstError: true }),
      });
    }

    try {
      const { profileId } = req.params;
      const newData = {
        ...req.body,
        profileId,
      };

      // console.log(newData);

      const simulator = await Simulator.create(newData);

      res.status(201).json({ simulator, message: "simulator created" });
    } catch (e) {
      res.status(500).json({ message: "server error" });
    }
  }
);
