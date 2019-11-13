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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const csvParser_1 = require("./csvParser");
let filePath;
function setPath(path) {
    filePath = path;
}
exports.setPath = setPath;
/**
 * Get a list of updated language packages. Return nothing if the given version is matched
 * @param code ISO language codes separated by comma. For example "en,fr"
 * @param version a JSON datetime format, stored in the client browser
 */
function getLanguagePack(code, version) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        if (!filePath) {
            return reject(`Unable to load language database. Check if you use "setPath" correctly`);
        }
        let metadata = yield isUpdated(version);
        if (metadata.updated) {
            return resolve();
        }
        let packages = yield loadLanguages();
        let output = {};
        code.split(",").forEach(lang => {
            if (lang in packages)
                return;
            if (lang in packages[0] === false) {
                return reject(`Language is not supported. Code ${lang}`);
            }
            output[lang] = extractPack(lang, packages);
        });
        output.version = metadata.version;
        resolve(output);
    }));
}
exports.getLanguagePack = getLanguagePack;
function isUpdated(version) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!version)
            return { updated: false };
        let stats = fs_1.default.statSync(filePath);
        let mtime = stats.mtime.toJSON();
        return {
            updated: version === mtime,
            version: mtime,
        };
    });
}
/**
 * Return a list of available languages as object { [code:string]: string }
 */
function getSupportedLanguages() {
    return new Promise((resolve, reject) => {
        loadLanguages()
            .then(data => {
            resolve(data[0]);
        })
            .catch(reject);
    });
}
exports.getSupportedLanguages = getSupportedLanguages;
function loadLanguages() {
    return new Promise((resolve, reject) => {
        if (!filePath) {
            return reject(`Unable to load language database. Check if you use "setPath" correctly`);
        }
        fs_1.default.readFile(filePath, "utf8", (err, data) => __awaiter(this, void 0, void 0, function* () {
            if (err) {
                reject(err);
            }
            else {
                const packages = csvParser_1.CSVToJSON(data, { headRow: 1 });
                resolve(packages);
            }
        }));
    });
}
function extractPack(code, packages) {
    let [name, ...phrases] = packages.map(p => p[code]);
    return { name, phrases };
}
