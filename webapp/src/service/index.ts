import { ApiResponse, StationResponse, TripResponse } from "jikokuhyou-webservice";

type fetch = (resource: string, init?: RequestInit) => Promise<Response>;


class ApiService {
    private fetch: fetch|undefined;

    protected getFetch(): fetch {
        if (this.fetch) {
            return this.fetch;
        }

        return window.fetch;
    }
}


export class StationApiService extends ApiService {
    private url = "/api/v1/station";


    public async search(term: string): Promise<StationResponse[]> {
        const response = await this.getFetch()(`${this.url}/search?term=${term}`);

        if (response.ok) {
            const json: ApiResponse = await response.json();
            const { data } = json;
            return data;
        }

        return Promise.reject(new Error(`request failed: ${this.url}/search`));
    }
}

export class TripApiService extends ApiService {
    private url = "/api/v1/trip";

    public async search(from: string, to: string): Promise<TripResponse[]> {
        const response = await this.getFetch()(`${this.url}/?from=${from}&to=${to}`);

        if (response.ok) {
            const json: ApiResponse = await response.json();
            const { data } = json;
            return data;
        }

        return Promise.reject(new Error(`request failed: ${this.url}/`));
    }
}
