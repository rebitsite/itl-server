import { Express, Response, Request } from "express";
import { resOK, resError } from "./itl-express-utils";
import { getSupportedLanguages, getLanguagePack, setPath } from "./loader";

export function intiateITLHandlers(app: Express, opts: {
    route?: string,
    csvPath: string,
}) {
    setPath(opts.csvPath);
    
    const { route } = Object.assign({ route: "languages" }, opts);
    app.get(`/${route}/list`, getSupportedList);
    app.get(`/${route}/:code`, getLanguageHandler);
}

async function getSupportedList(req: Request, res: Response) {
    getSupportedLanguages()
        .then(list => {
            resOK(res, list);
        })
        .catch((err: any) => resError(res, err.toString()))
}

function getLanguageHandler(req: Request, res: Response) {

    if (req.params.code) {
        getLanguagePack(req.params.code, req.query.version)
            .then(data => {
                resOK(res, data)
            })
            .catch(error => {
                resError(res, `Requested language is not available. Error: ${error.toString()}`);
            })
    } else {
        resError(res);
    }
}