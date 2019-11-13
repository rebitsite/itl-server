export declare function setPath(path: string): void;
/**
 * Get a list of updated language packages. Return nothing if the given version is matched
 * @param code ISO language codes separated by comma. For example "en,fr"
 * @param version a JSON datetime format, stored in the client browser
 */
export declare function getLanguagePack(code: string, version?: string): Promise<any>;
/**
 * Return a list of available languages as object { [code:string]: string }
 */
export declare function getSupportedLanguages(): Promise<{
    [code: string]: string;
}>;
