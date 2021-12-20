import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import mongoose from "mongoose";
import { PORT, DBURL, CORS_ORIGINS } from "./config";
import logger, { errorLoggerMiddleware } from "./services/logger.service";
import { router as favoriteRouter } from "./routes/favorite.router";
import { router as profileRouter } from "./routes/profile.router";
import { router as simulatorRouter } from "./routes/simulator.router";

/**
 * database connection
 */
mongoose
  .connect(`${DBURL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Connected to DB ${DBURL}`);

    mongoose.connection.on("disconnected", () => {
      logger.error("MongoDB disconnected");
      process.exit(1);
    });
  })
  .catch((err) => {
    logger.error(err);
    process.exit(1);
  });

/**
 * creating express app and add global middlewares
 */
const app = express();
app.use(helmet());
app.use(cors({ origin: CORS_ORIGINS }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
 * express routers
 */
app.use(favoriteRouter);
app.use(profileRouter);
app.use(simulatorRouter);

/**
 * adding global error handler and logger to express app
 */
app.use(errorLoggerMiddleware);
app.use((req, res) => {
  res.status(500).send({ message: "server error" });
});

/**
 * starting app
 */
app.listen(PORT, () =>
  console.log(`✅  Ready on port http://localhost:${PORT}`)
);
