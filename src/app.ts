import express, { NextFunction, Request, Response } from "express";
import { config } from "dotenv";
config({ quiet: true });

const port = process.env.PORT ?? 3000;
const app = express();



app.use((req: Request, res: Response, next: NextFunction) => {
    console.log("LOG:", req.method, req.url);
    next();
});

app.get("/", (req: Request, res: Response) => {
    res.json({ messaggio: "Benvenuto" });
});

app.get("/ciao", (req: Request, res: Response) => {
    res.send(`<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>Ciao</title>
                </head>
                <body>
                    <h1>Ciao!</h1>
                </body>
                </html>
                `);
});


// 404 sottointeso


// 500 sottointeso

app.listen(port, () => {
    console.log(`Server in esecuzione su http://localhost:${port}`);
    console.log("Premere CTRL+C per arrestare");
});
