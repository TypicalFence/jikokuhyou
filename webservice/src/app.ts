import { attachControllers } from "@decorators/express";
import controllers from "./controller/";
import express from "express";

const app: express.Application = express();

attachControllers(app, controllers);
app.listen(3000);