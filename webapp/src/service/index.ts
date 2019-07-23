import { ApiResponse, StationDTO, TripDTO } from "sbb-webservice";

export class StationApiService {
    private url = "/api/v1/station";
    private fetch = window.fetch;

    public async search(term: string): Promise<StationDTO[]> {
        const response = await this.fetch(`${this.url}/search?term=${term}`);

        if (response.ok) {
            const json: ApiResponse = await response.json();
            const { data } = json;
            return data;
        }

        return Promise.reject(new Error(`request failed: ${this.url}/search`));
    }
}

export class TripApiService {
    private url = "/api/v1/trip";
    private fetch = window.fetch;

    public async search(from: string, to: string): Promise<TripDTO[]> {
        const response = await this.fetch(`${this.url}/?from=${from}&to=${to}`);

        if (response.ok) {
            const json: ApiResponse = await response.json();
            const { data } = json;
            return data;
        }

        return Promise.reject(new Error(`request failed: ${this.url}/`));
    }
}
