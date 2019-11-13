import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { intiateITLHandlers } from "itl-server/dist/itl-express";
import path from "path";

const app = express();
app.use(bodyParser.json());
app.use(cors())

intiateITLHandlers(app, {
    csvPath: path.join(__dirname, "../data/languages.csv")
});

const PORT = 8080;
app.listen(PORT, function() {
    console.log(`Server is running on :${PORT}`)
});

