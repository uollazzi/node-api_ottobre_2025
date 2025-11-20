import mongoose from "mongoose";

type Post = {
    title: string,
    author: string,
    body: string,
    date: Date,
    hidden: boolean
}

const postSchema = new mongoose.Schema<Post>({
    title: { type: String, required: true },
    author: { type: String, required: true },
    body: { type: String, required: true },
    date: { type: Date, default: Date.now() },
    hidden: { type: Boolean, default: true },
});

export const PostDBModel = mongoose.model<Post>("Post", postSchema, "posts");