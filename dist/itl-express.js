"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const itl_express_utils_1 = require("./itl-express-utils");
const loader_1 = require("./loader");
function intiateITLHandlers(app, opts) {
    loader_1.setPath(opts.csvPath);
    const { route } = Object.assign({ route: "languages" }, opts);
    app.get(`/${route}/list`, getSupportedList);
    app.get(`/${route}/:code`, getLanguageHandler);
}
exports.intiateITLHandlers = intiateITLHandlers;
function getSupportedList(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        loader_1.getSupportedLanguages()
            .then(list => {
            itl_express_utils_1.resOK(res, list);
        })
            .catch((err) => itl_express_utils_1.resError(res, err.toString()));
    });
}
function getLanguageHandler(req, res) {
    if (req.params.code) {
        loader_1.getLanguagePack(req.params.code, req.query.version)
            .then(data => {
            itl_express_utils_1.resOK(res, data);
        })
            .catch(error => {
            itl_express_utils_1.resError(res, `Requested language is not available. Error: ${error.toString()}`);
        });
    }
    else {
        itl_express_utils_1.resError(res);
    }
}
