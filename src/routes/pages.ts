import { Request, Response, NextFunction, Router } from "express";
import path from "node:path";

const router = Router();

router.get("/pippo", (req: Request, res: Response) => {
    const cwd = process.cwd();
    res.sendFile(path.join(cwd, "public", "pippo.jpg"));
});

router.get("/ciao", (req: Request, res: Response) => {
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

export default router;