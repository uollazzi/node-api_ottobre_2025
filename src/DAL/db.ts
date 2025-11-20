import mongoose from "mongoose";
import { PostDBModel } from "./models/post";
import { dbLogger } from "../middlewares/logger";

const connString = process.env.MONGODB_CONNECTION_STRING!;
const dbName = process.env.DB_NAME!;

export const insertPost = async (title: string, author: string, body: string, hidden: boolean = true) => {
    try {
        await mongoose.connect(connString, { dbName });

        const post = new PostDBModel();
        post.title = title;
        post.author = author;
        post.body = body;
        post.hidden = hidden;

        const r = await post.save();
        dbLogger.info(`Nuovo posto inserito con id: ${r.id}`);

        return r;
    } catch (error: any) {
        dbLogger.error(error.message);
        throw new Error(error.message);
    }
    finally {
        await mongoose.disconnect();
    }
}

export const getPostsHomePage = async () => {
    try {
        await mongoose.connect(connString, { dbName });

        return await PostDBModel.find({ hidden: false });
    } catch (error: any) {
        dbLogger.error(error.message);
        throw new Error(error.message);
    }
    finally {
        await mongoose.disconnect();
    }
}