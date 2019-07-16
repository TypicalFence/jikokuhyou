export interface StationDTO {
    id: string;
    name: string;
    position?: { x: number; y: number };
    type?: string;
}