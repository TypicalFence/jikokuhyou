import { Controller, Get, Request as Req, Response as Res } from "@decorators/express";
import { Container } from "@decorators/di";
import { Request, Response } from "express";
import { TripService, OpenDataTripService } from "../service/tripService";
import { ApiResponseBuilder } from "../dto";

@Controller("/api/v1/trip")
export default class TripController {

    private tripService: TripService;

    public constructor() {
        this.tripService = Container.get<TripService>(OpenDataTripService);
    }

    @Get("/")
    public async searchStation(@Req() request: Request, 
                               @Res() response: Response): Promise<Response> {
        
        const { from, to } = request.query;
        if (from && to) { 
            const trips = await this.tripService.findTrips("8500320", "8500322");
            return response.send(new ApiResponseBuilder(200).withData(trips));
        } else {
            return response.send(new ApiResponseBuilder(400).withMSG("no from & to"));
        }
    }
}
