import {
    ApiResponse, StationResponse, TripRequest, TripRequestOptions, TripResponse,
} from "jikokuhyou-protocol";

type fetch = (resource: string, init?: RequestInit) => Promise<Response>;

export interface TripSearchOptions extends TripRequestOptions {
    via?: string;
}

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

    public async search(
        from: string,
        to: string,
        options?: TripSearchOptions,
    ): Promise<TripResponse[]> {
        if (options) {
            return this.searchFull(from, to, options);
        }

        return this.searchSimple(from, to);
    }

    private async searchFull(
        from: string,
        to: string,
        options: TripSearchOptions,
    ): Promise<TripResponse[]> {
        const fetch: fetch = this.getFetch();
        const { via } = options;
        const tripRequest: TripRequest = {
            from,
            to,
            via,
            options,
        };

        const response = await fetch(`${this.url}/search`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(tripRequest),
        });

        if (response.ok) {
            const json: ApiResponse = await response.json();
            const { data } = json;
            return data;
        }

        return Promise.reject(new Error(`request failed: ${this.url}/search`));
    }

    private async searchSimple(from: string, to: string): Promise<TripResponse[]> {
        const response = await this.getFetch()(`${this.url}/?from=${from}&to=${to}`);

        if (response.ok) {
            const json: ApiResponse = await response.json();
            const { data } = json;
            return data;
        }

        return Promise.reject(new Error(`request failed: ${this.url}/`));
    }
}
