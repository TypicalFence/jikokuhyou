import { Controller, Get, Request as Req, Response as Res } from "@decorators/express";
import { Container } from "@decorators/di";
import { Request, Response } from "express";
import { TripService } from "../service/tripService";
import { ApiResponseBuilder } from "../protocol";
import { config, Config } from "../config";

@Controller("/api/v1/trip")
export default class TripController {

    private tripService: TripService;

    public constructor() {
        const conf = Container.get<Config>(config);
        this.tripService = Container.get<TripService>(conf.tripService);
    }

    @Get("/")
    public async searchStation(@Req() request: Request, 
                               @Res() response: Response): Promise<Response> {
        
        const { from, to } = request.query;
        if (from && to) { 
            const trips = await this.tripService.findTrips(from, to);
            return response.send(new ApiResponseBuilder(200).withData(trips));
        } else {
            return response.send(new ApiResponseBuilder(400).withMSG("no from & to"));
        }
    }
}
