// SOURCE: https://www.bennadel.com/blog/1504-ask-ben-parsing-csv-strings-with-javascript-exec-regular-expression-command.htm

export function CSVToArray(strData: string, strDelimiter?: string) : string[][] {

    strDelimiter = (strDelimiter || ",");
    var objPattern = new RegExp((
        "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" + // Delimiters.
        "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" + // Quoted fields.
        "([^\"\\" + strDelimiter + "\\r\\n]*))"// Standard fields.
    ), "gi");

    var arrData: string[][] = [[]];
    var arrMatches = null;

    while ((arrMatches = objPattern.exec(strData))) {
        var strMatchedDelimiter = arrMatches[1];
        if (strMatchedDelimiter.length &&
            (strMatchedDelimiter !== strDelimiter)) {
            arrData.push([]);
        }

        let strMatchedValue: string = "";
        if (arrMatches[2]) {
            strMatchedValue = arrMatches[2].replace(
                new RegExp("\"\"", "g"),
                "\""
            );
        } else {
            strMatchedValue = arrMatches[3];
        }

        arrData[arrData.length - 1].push(strMatchedValue);
    }
    return (arrData);
}

export function CSVToJSON(data: string, opts?: { seperator?: string, headRow?: number }) {

    let { seperator, headRow } = Object.assign({ seperator: ',', headRow: 0 }, opts)
    let arrays = CSVToArray(data, seperator);
    let schema = arrays.splice(headRow, 1)[0] as string[];

    let rs: { [prop: string]: any }[] = [];
    let obj: { [prop: string]: any };
    arrays.forEach(item => {
        obj = {};
        schema.forEach((prop, i) => {
            obj[prop] = item[i];
        });
        rs.push(obj);
    })

    return rs;
}