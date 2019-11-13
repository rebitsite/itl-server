"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const itl_express_1 = require("itl-server/dist/itl-express");
const path_1 = __importDefault(require("path"));
const app = express_1.default();
app.use(body_parser_1.default.json());
app.use(cors_1.default());
itl_express_1.intiateITLHandlers(app, {
    csvPath: path_1.default.join(__dirname, "../data/languages.csv")
});
const PORT = 8080;
app.listen(PORT, function () {
    console.log(`Server is running on :${PORT}`);
});
