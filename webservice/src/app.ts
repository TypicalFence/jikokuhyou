import { attachControllers } from "@decorators/express";
import controllers from "./controller/";
import express from "express";
import configData from "../config";
import { config } from "./config";
import { Container } from "@decorators/di";

Container.provide([{ provide: config, useValue: configData }]);

const app: express.Application = express();

attachControllers(app, controllers);
app.listen(3000);