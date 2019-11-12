import bodyParser from "body-parser";
import { Request, Response, NextFunction, } from "express";
import { Middleware} from "@decorators/express";

export class JsonBodyMiddleware implements Middleware {
    public use(request: Request, response: Response, next: NextFunction): void {
        return bodyParser.json()(request, response, next);
    }
}

export class TextBodyMiddleware implements Middleware {
    public use(request: Request, response: Response, next: NextFunction): void {
        return bodyParser.text()(request, response, next);
    }
}
