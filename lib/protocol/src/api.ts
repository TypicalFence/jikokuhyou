export interface ApiResponse {
    status: number;
    msg?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any;
}