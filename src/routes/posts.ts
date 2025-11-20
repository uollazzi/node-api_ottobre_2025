import { Router, Request, Response } from "express";
import * as db from "../DAL/db";
import { PostDTO } from "../models/post";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
    try {
        const p: PostDTO = req.body;

        const r = await db.insertPost(p.title, p.author, p.body, p.hidden);

        res.status(201).json(r);
    }
    catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

router.get("/", async (req: Request, res: Response) => {
    try {
        res.json((await db.getPostsHomePage()).map(p => {
            return {
                title: p.title,
                author: p.author,
                body: p.body,
                id: p.id
            };
        }));
    }
    catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

export default router;