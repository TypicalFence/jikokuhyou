import { Controller, Get, Post, Request as Req, Response as Res } from "@decorators/express";
import { Container } from "@decorators/di";
import { Request, Response } from "express";
import { TripService } from "jikokuhyou-service-interface";
import { TripRequest, isTripRequest } from "jikokuhyou-protocol";
import { ApiResponseBuilder } from "../protocol";
import { config, Config } from "../config";
import { TripRequestOptionsAdapter } from "../adapter";

@Controller("/api/v1/trip")
export default class TripController {

    private tripService: TripService;

    public constructor() {
        const conf = Container.get<Config>(config);
        this.tripService = Container.get<TripService>(conf.tripService);
    }

    @Get("/")
    public async index(@Req() request: Request, 
                               @Res() response: Response): Promise<Response> {
        
        const { from, to } = request.query;
        
        if (from && to) { 
            const trips = await this.tripService.findTrips(from, to);
            return response.send(new ApiResponseBuilder(200).withData(trips));
        } else {
            return response.send(new ApiResponseBuilder(400).withMSG("no from & to"));
        }
    }

    @Post("/search")
    public async search(@Req() request: Request, 
                               @Res() response: Response): Promise<Response> {
        
        if (isTripRequest(request.body)) {
            const requestData: TripRequest = request.body;
            const {from, to, via,  options} = requestData;
            let serviceOptions = {};

            if (typeof options !== "undefined") {
                serviceOptions = new TripRequestOptionsAdapter(options);
            }
            
            let trips;
            
            if (typeof via !== "undefined") {
                trips = await this.tripService.findTripsVia(from, to, via, serviceOptions);
            } else {
                trips = await this.tripService.findTrips(from, to, serviceOptions);
            }

            return response.send(new ApiResponseBuilder(200).withData(trips));
        } else {
            return response.send(new ApiResponseBuilder(400).withMSG("invalid input"));
        }
    }
}
