export * from "./station";
export * from "./trip";

export interface HasPosition {
    getX(): number;
    getY(): number;
}
