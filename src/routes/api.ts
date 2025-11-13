import { Request, Response, NextFunction, Router } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
    res.json({ messaggio: "Benvenuto" });
});

router.get("/error", (req: Request, res: Response) => {
    throw new Error("Errore simulato");
});

router.get("/error2", (req: Request, res: Response) => {
    if (true) {
        res.status(500).json({ message: "Errore perchè sì" });
    }
});

export default router;