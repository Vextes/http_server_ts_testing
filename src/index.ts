import express from "express";
import { handlerReadiness } from "./api/readiness.js";
import { middlewareLogResponses, middlewareMetricsInc } from "./api/middleware.js";
import { handlerFileserverHits, handlerReset } from "./api/fileserverHits.js";
import { handlerValidateChirps } from "./api/validation.js";

const app = express();
const PORT = 8080;

app.use(middlewareLogResponses);
app.use("/app", middlewareMetricsInc, express.static("./src/app"));

app.get("/api/healthz", handlerReadiness);
app.get("/admin/metrics", handlerFileserverHits);
app.post("/admin/reset", handlerReset);

app.post("/api/validate_chirp", handlerValidateChirps);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/app`);
});