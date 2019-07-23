import { RequestInit } from "node-fetch";

export interface FakeOptions {
    body?: any;
    status: number;
}

export interface FakeResponse {
    status: number;
    ok: boolean;
    url: string;
    json(): Promise<any>;
    text(): Promise<string>;
}

class Response implements FakeResponse {
    private readonly body: any;
    public status: number;
    public ok: boolean;
    public url: string;

    public constructor(status: number, body: any) {
        this.status = status;
        
        this.ok = status === 200;

        this.body = body;
    }

    public json(): Promise<any> {
        return Promise.resolve(this.body);
    }

    public text(): Promise<string> {
        if (typeof this.body === "string") {
            return Promise.resolve(this.body);
        } else {
            return Promise.reject();
        }
    }
}

export function fakeFetch(options: FakeOptions): (r: string, i: RequestInit) => Promise<FakeResponse> {
    return (resource: string, init: RequestInit): Promise<FakeResponse> => {
        const { status, body } = options;

        return Promise.resolve(new Response(status, body));
    };
}