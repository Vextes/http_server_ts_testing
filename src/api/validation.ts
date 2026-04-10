import type { Request, Response } from "express";
import { InvalidSumbissionError } from "./errors.js";

export async function handlerValidateChirps(req: Request, res: Response) {
    type parameters = {
        body: string;
    };
    const params: parameters = req.body;

    if (params.body.length > 140) {
        throw new InvalidSumbissionError("Chirp is too long. Max length is 140")
    }

    const profanity = ["kerfuffle", "sharbert", "fornax"];
    const censored = "****";
    const wordList = params.body.split(' ');
    for (const key in wordList) {
        if (profanity.includes(wordList[key].toLowerCase())) {
            wordList[key] = censored;
        }
    }

    res.status(200).send({cleanedBody: wordList.join(' ')});
}