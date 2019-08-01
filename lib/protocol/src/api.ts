export type ResponseData = object;

export interface ApiResponse {
    status: number;
    msg?: string;
    data?: ResponseData|ResponseData[];
}
