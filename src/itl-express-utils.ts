import { Response } from "express";

export function resOK(res: Response, data?: any) {
    let opts: any = { status: "ok"};
    data && (opts.data = data);
    res.status(200).send(opts)
}

export function resError(res: Response, message?: any) {
    let opts: any = { status: "error", message};
    res.status(400).send(opts)
}