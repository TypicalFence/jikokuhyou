import { RequestInit } from "node-fetch";

export interface FakeOptions {
    body?: any;
    status: number;
}

export interface FakeResponse {
    status: number;
    ok: boolean;
    json(): Promise<any>;
    text(): Promise<string>;
}

class Response implements FakeResponse {
    private body: any;

    public status: number;

    public ok: boolean;

    public constructor(status: number, body: any) {
        this.status = status;

        if (status === 200) {
            this.ok = true;
        } else {
            false;
        }

        this.body = body;
    }

    public json(): Promise<any> {
        return Promise.resolve(this.body);
    }

    public text(): Promise<string> {
        if (typeof this.body === "string") {
            return Promise.resolve(this.body);
        }
        return Promise.reject();
    }
}

export function fakeFetch(options: FakeOptions): (r: string, i: RequestInit) => Promise<FakeResponse> {
    return (resource: string, init: RequestInit): Promise<FakeResponse> => {
        const { status, body } = options;

        return Promise.resolve(new Response(status, body));
    };
}
