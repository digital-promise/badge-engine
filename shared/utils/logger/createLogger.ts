import winston, { format } from "winston";
import winstonConfig from "./winstonConfig";

const {
  combine,
  errors,
  prettyPrint,
  json,
  timestamp,
  colorize,
  simple,
  printf,
} = format;

winston.addColors(winstonConfig.colors);

const logFormat = printf(({ level, message, timestamp }) => {
  return `${level}: ${message} - ${timestamp}\x1b[0m `;
});

const logger = winston.createLogger({
  levels: winstonConfig.levels,
  format: combine(
    prettyPrint(),
    json(),
    timestamp(),
    colorize(),
    simple(),
    errors({ stack: true }),
    logFormat,
  ),
  transports: [
    // - Write all logs with importance level of `error` or less to `error.log`
    new winston.transports.Console({
      level: "error",
      format: printf((info) => {
        return `${info.timestamp} : ${info.message}\n 
        ${JSON.stringify(info.meta, null, 4)}`;
        // Meta as additional data you provide while logging
      }),
    }),
  ],
  level: "custom",
});

// If we're not in production then log to the console
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: combine(colorize({ all: true }), simple(), logFormat),
    }),
  );
}

export default logger;
