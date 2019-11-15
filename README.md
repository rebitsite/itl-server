# itl-server - A simple translation server for `itl`

`itl-server` is a DIY translation service, powered by Google Translator through Spreadsheet.
It is designed to only work with [itl client library](https://github.com/hieunc229/itl). It's free and simple to setup. For more details, read [Translate the entire app to 103 languages: A DIY tutorial](http://about.saltar.co/blog/translate-entire-app-with-spreadsheet-diy-tutorial)

An example is available through [`example` branch](https://github.com/hieunc229/itl-server/tree/example)

## 1. Installation

`itl-server` is available as an npm package. You can install using `npm` or `yarn`

```js
// using NPM
npm install itl-server --save

// using Yarn
npm add itl-server
```

## 2. How to use

There are 2 options to use `itl-server` as following:

### 2.1. Use with `express` server

In case there is an available `express` server, all you have to do is initiate `itl` handlers.
It will automatically create API handler for you (which are `/languages/list`, and `/languages/:code`)

**Syntax:**
```js
import { initiateITLHandlers } from "itl-server/dist/itl-express";
initiateITLHandlers(app: Express, options: {
    route: string,
    csvPath: string
});
```

**Where:**
- `route`?: is the API route for language request. "languages" is set by default
- `csvPath`: `language.csv` file contains translated languages

### 2.2. Using available methods

If you don't use `express`, there are 3 methods that you can use:
```js
// Import the methods
import { setPath, getSupportedLanguages, getLanguagePack } from "itl-server";
```

#### 2.2.1 Set the `languages.csv` path

**Syntax:**
```js
setPath(path: string) => void;
```

**Where:**
- `path` is the path to `languages.csv` file. Best to use with `path` resolver

####  2.2.2 Get a list of supported languages

**Syntax:**
```js
getSupportedLanguages() : 
    Promise<{ [code: string]: string }>
// => { en: "English", fr: "French (Français)", ... }
```

####  2.2.3 Get the language packages using codes

**Syntax:**
```js
getLanguagePack(languageCodes: string, version?: string) : 
    Promise<{ [code: string]: { name: string, pharses: string[]} }>
```

**Where:**
- `languageCodes`: is a list of language ISO-639-1 identifiers, separated by a comma
- `version` (optional): a version stored at local cached, if the version is matched, it will not return anything

**Exception:**
- Throw exception when one of the `languageCodes` not exists

```js
const languages = getLanguagePack("en,fr");
// => {
//     en: {
//         name: "English",
//         phrases: [ 'Hello, __name__!', ...]
//     },
//     fr: {
//         name: "French (Français)",
//         phrases: [ 'Bonjour, __name__!', ...]
//     }
// }
```
