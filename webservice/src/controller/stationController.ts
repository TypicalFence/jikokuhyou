import { Controller, Get, Request as Req, Response as Res } from "@decorators/express";
import { Container } from "@decorators/di";
import { Request, Response } from "express";
import { StationSerivce } from "../service/stationService";
import { ApiResponseBuilder } from "../protocol";
import { config, Config } from "../config";

@Controller("/api/v1")
class StationController {

    private stationService: StationSerivce;

    public constructor() {
        const conf = Container.get<Config>(config);
        this.stationService = Container.get<StationSerivce>(conf.stationService);
    }

    @Get("/station/search")
    public async searchStation(@Req() request: Request, 
                               @Res() response: Response): Promise<Response> {
        const { term } = request.query;
        
        if (term) {
            const results = await this.stationService.searchStation(term);
            return response.send(new ApiResponseBuilder(200).withMSG("ok").withData(results));
        } else {
            return response.send(new ApiResponseBuilder(400).withMSG("no term"));
        }
    }
}

export default StationController;