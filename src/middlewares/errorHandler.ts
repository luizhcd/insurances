import { NextFunction, Request, Response } from "express";
import BaseError from "../errors/baseError";


export default function errorHandler(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (error instanceof BaseError) {
        return res.status(error.statusCode).json({
            error: {
                message: error.message,
                code: error.statusCode,
            },
        });
    }

    if (error instanceof Error) {
        console.error(error)
        return res.status(500).json(error.message)
    } else {
        console.error(error)
        return res.status(500).json('Something went wrong')
    }

}
