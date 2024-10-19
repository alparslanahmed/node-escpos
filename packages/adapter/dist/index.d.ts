/// <reference types="node" />
declare const EventEmitter: any;
export declare class NotImplementedException extends Error {
}
export declare abstract class Adapter<CloseArgs extends unknown[]> extends EventEmitter {
    abstract open(callback?: (error: Error | null) => void): this;
    abstract write(data: Buffer | string, callback?: (error: Error | null) => void): this;
    abstract close(callback?: (error: Error | null) => void, ...closeArgs: CloseArgs): this;
    abstract read(callback?: (data: Buffer) => void): void;
}
export {};
//# sourceMappingURL=index.d.ts.map