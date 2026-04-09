import type { NextFunction, Request, Response } from "express";
import { config } from "../config.js"

export async function middlewareLogResponses(req: Request, res: Response, next: NextFunction) {
    res.on("finish", () => {
        const statusCode = res.statusCode;
        if (statusCode < 200 || statusCode > 299) {
            console.log(`[NON-OK] ${req.method} ${req.url} - Status: ${statusCode}`);
        }
    });
    next();
}

export async function middlewareMetricsInc(req: Request, res: Response, next: NextFunction) {
    res.on("finish", () => {
        config.fileserverHits++;
    });
    next();
}

export function middlewareHandleError(err: Error, req: Request, res: Response, next: NextFunction) {
    const errMessage = "Something went wrong on our end"
    console.error(err.message);
    res.status(500).json({
        error: errMessage,
    });
}