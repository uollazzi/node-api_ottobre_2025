import express, { NextFunction, Request, Response } from "express";
import { config } from "dotenv";
import { logger, loggerMiddleware } from "./middlewares/logger";
config({ quiet: true });

import pagesRouter from "./routes/pages";
import apiRouter from "./routes/api";

const port = process.env.PORT ?? 3000;
const app = express();

// MVC - Model View Controller

app.use(loggerMiddleware);

app.use(express.static("./public"));

app.use("/", pagesRouter);
app.use("/api", apiRouter);

// 404 
app.use((req: Request, res: Response) => {
    logger.warn("Risorsa non trovata");
    res.status(404).json({ message: "Risorsa non trovata" });
});

// 500 
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error("Errore del server. Riprova più tardi.");
    res.status(500).json({ message: "Errore del server. Riprova più tardi." });
});

app.listen(port, () => {
    console.log(`Server in esecuzione su http://localhost:${port}`);
    console.log("Premere CTRL+C per arrestare");
});
