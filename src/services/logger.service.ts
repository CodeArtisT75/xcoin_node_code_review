import winston from "winston";
import * as expressWinston from "express-winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      filename: "./logs/error.log",
      level: "error",
    }),
    new winston.transports.File({
      filename: "./logs/combined.log",
    }),
  ],
});

export const errorLoggerMiddleware = expressWinston.errorLogger({
  winstonInstance: logger,
});

export default logger;
