import type { Request, Response } from "express";

export async function handlerValidateChirps(req: Request, res: Response) {
    type parameters = {
        body: string;
    };
    const params: parameters = req.body;

    if (params.body.length > 140) {
        res.status(400).send({error: "Chirp is too long"})
    }
    else {
        res.status(200).send({valid: true});
    }
}