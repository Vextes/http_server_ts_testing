import type { Request, Response } from "express";
import { config } from "../config.js";

export async function handlerFileserverHits(_:Request, res: Response) {
    res.send(`Hits: ${config.fileserverHits}`);
}

export async function handlerReset(_:Request, res: Response) {
    config.fileserverHits = 0;
    res.send("reset hits");
}