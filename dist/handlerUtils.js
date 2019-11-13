"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function resOK(res, data) {
    let opts = { status: "ok" };
    data && (opts.data = data);
    res.status(200).send(opts);
}
exports.resOK = resOK;
function resError(res, message) {
    let opts = { status: "error", message };
    res.status(400).send(opts);
}
exports.resError = resError;
