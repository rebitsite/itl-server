"use strict";
// SOURCE: https://www.bennadel.com/blog/1504-ask-ben-parsing-csv-strings-with-javascript-exec-regular-expression-command.htm
Object.defineProperty(exports, "__esModule", { value: true });
function CSVToArray(strData, strDelimiter) {
    strDelimiter = (strDelimiter || ",");
    var objPattern = new RegExp(("(\\" + strDelimiter + "|\\r?\\n|\\r|^)" + // Delimiters.
        "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" + // Quoted fields.
        "([^\"\\" + strDelimiter + "\\r\\n]*))" // Standard fields.
    ), "gi");
    var arrData = [[]];
    var arrMatches = null;
    while ((arrMatches = objPattern.exec(strData))) {
        var strMatchedDelimiter = arrMatches[1];
        if (strMatchedDelimiter.length &&
            (strMatchedDelimiter !== strDelimiter)) {
            arrData.push([]);
        }
        let strMatchedValue = "";
        if (arrMatches[2]) {
            strMatchedValue = arrMatches[2].replace(new RegExp("\"\"", "g"), "\"");
        }
        else {
            strMatchedValue = arrMatches[3];
        }
        arrData[arrData.length - 1].push(strMatchedValue);
    }
    return (arrData);
}
exports.CSVToArray = CSVToArray;
function CSVToJSON(data, opts) {
    let { seperator, headRow } = Object.assign({ seperator: ',', headRow: 0 }, opts);
    let arrays = CSVToArray(data, seperator);
    let schema = arrays.splice(headRow, 1)[0];
    let rs = [];
    let obj;
    arrays.forEach(item => {
        obj = {};
        schema.forEach((prop, i) => {
            obj[prop] = item[i];
        });
        rs.push(obj);
    });
    return rs;
}
exports.CSVToJSON = CSVToJSON;
