import { attachControllers } from "@decorators/express";
import controllers from "./controller/";
import express from "express";
import configData from "../config";
import { Config, config } from "./config";
import { Container } from "@decorators/di";

const conf: Config = configData;

Container.provide([{ provide: config, useValue: conf }]);

const app: express.Application = express();

attachControllers(app, controllers);
app.listen(conf.port);