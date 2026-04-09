import type { Request, Response } from "express";

export async function handlerValidateChirps(req: Request, res: Response) {
    type parameters = {
        body: string;
    };
    const params: parameters = req.body;

    if (params.body.length > 140) {
        throw new Error("Chirp is too long")
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