import fs from "fs";
import { CSVToJSON } from "./csvParser";

let filePath: string | undefined;

export function setPath(path: string) {
    filePath = path;
}

/**
 * Get a list of updated language packages. Return nothing if the given version is matched
 * @param code ISO language codes separated by comma. For example "en,fr"
 * @param version a JSON datetime format, stored in the client browser
 */
export function getLanguagePack(code: string, version?: string): Promise<any> {
    return new Promise(async (resolve, reject) => {

        if (!filePath) {
            return reject(`Unable to load language database. Check if you use "setPath" correctly`);
        }

        let metadata = await isUpdated(version);
        if (metadata.updated) {
            return resolve()
        }

        let packages = await loadLanguages();
        let output: any = {};

        code.split(",").forEach(lang => {
            if (lang in packages) return;
            if (lang in packages[0] === false) {
                return reject(`Language is not supported. Code ${lang}`);
            }
            output[lang] = extractPack(lang, packages);
        })
        output.version = metadata.version;
        resolve(output)
    })
}

async function isUpdated(version?: string) {
    if (!version) return { updated: false };
    let stats = fs.statSync(filePath as string);
    let mtime = stats.mtime.toJSON();
    return {
        updated: version === mtime,
        version: mtime,
    }
}

/**
 * Return a list of available languages as object { [code:string]: string }
 */
export function getSupportedLanguages(): Promise<{ [code: string]: string }> {
    return new Promise((resolve, reject) => {
        loadLanguages()
            .then(data => {
                resolve(data[0])
            })
            .catch(reject)
    })
}

function loadLanguages(): Promise<{ [prop: string]: any; }[]> {

    return new Promise((resolve, reject) => {
        if (!filePath) {
            return reject(`Unable to load language database. Check if you use "setPath" correctly`);
        }
        fs.readFile(filePath, "utf8", async (err, data) => {
            if (err) {
                reject(err);
            } else {
                const packages = CSVToJSON(data, { headRow: 1 })
                resolve(packages)
            }
        })
    })
}

function extractPack(code: string, packages: { [code: string]: string }[]) {
    let [name, ...phrases] = packages.map(p => p[code]);
    return { name, phrases };
}