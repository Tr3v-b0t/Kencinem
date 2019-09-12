/* eslint-disable import/no-extraneous-dependencies */
import express from "express";
import bodyParser from "body-parser";
import "@babel/polyfill";
import cors from "cors";
import logger from "morgan";

import router from "./routes";

const app = express();

app.use(cors());

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

router(app);

export default app;
