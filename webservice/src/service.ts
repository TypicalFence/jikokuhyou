// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export interface Service<T> extends Function { new (...args: any[]): T }
