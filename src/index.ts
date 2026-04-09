import express, { NextFunction, Request, Response } from "express";
import { handlerReadiness } from "./api/readiness.js";
import { middlewareHandleError, middlewareLogResponses, middlewareMetricsInc } from "./api/middleware.js";
import { handlerFileserverHits, handlerReset } from "./api/fileserverHits.js";
import { handlerValidateChirps } from "./api/validation.js";

const app = express();
const PORT = 8080;

function asyncHandler(fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next)
    };
}

app.use(middlewareLogResponses);
app.use(express.json());
app.use("/app", middlewareMetricsInc, express.static("./src/app"));

app.get("/api/healthz", asyncHandler(handlerReadiness));
app.get("/admin/metrics", asyncHandler(handlerFileserverHits));
app.post("/admin/reset", asyncHandler(handlerReset));

app.post("/api/validate_chirp", asyncHandler(handlerValidateChirps));

app.use(middlewareHandleError);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/app`);
});