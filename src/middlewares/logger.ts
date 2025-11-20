import winston from "winston";
import path from "node:path";
import fs from "node:fs";
import { Request, Response, NextFunction } from "express";

export const logger = winston.createLogger({
    level: process.env.LOG_LEVEL ?? "error",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level.toUpperCase()}] ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: path.join("logs", "app.log") }),
    ]
});

export const dbLogger = winston.createLogger({
    level: process.env.LOG_LEVEL ?? "error",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level.toUpperCase()}] ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: path.join("logs", "db.log") }),
    ]
});

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // log manuale
    const logString = `LOG: ${new Date().toUTCString()} - ${req.method} ${req.url}`;
    console.log(logString);
    const logFilePath = path.join(process.cwd(), "logs", "logs.txt");
    fs.appendFile(logFilePath, logString + "\n", "utf-8", (err) => { if (err) console.log(err); });

    // log winston
    logger.info(`${req.method} ${req.url}`);
    next();
}