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
const handlerUtils_1 = require("./handlerUtils");
const loader_1 = require("./loader");
function intiateLanguageHandler(app) {
    app.post("/languages/report", postErrorHandler);
    app.get("/languages/list", getSupportedList);
    app.get("/languages/:code", getLanguageHandler);
}
exports.intiateLanguageHandler = intiateLanguageHandler;
function getSupportedList(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        loader_1.loadLanguages()
            .then(all => {
            handlerUtils_1.resOK(res, all[0]);
        })
            .catch((err) => handlerUtils_1.resError(res, err.toString()));
    });
}
function postErrorHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        handlerUtils_1.resError(res, "Request is invalid");
    });
}
function getLanguageHandler(req, res) {
    if (req.params.code) {
        loader_1.getLanguagePack(req.params.code, req.query.version)
            .then(data => {
            handlerUtils_1.resOK(res, data);
        })
            .catch(error => {
            handlerUtils_1.resError(res, `Requested language is not available. Error: ${error.toString()}`);
        });
    }
    else {
        handlerUtils_1.resError(res);
    }
}
