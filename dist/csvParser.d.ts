export declare function CSVToArray(strData: string, strDelimiter?: string): string[][];
export declare function CSVToJSON(data: string, opts?: {
    seperator?: string;
    headRow?: number;
}): {
    [prop: string]: any;
}[];
