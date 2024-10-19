/// <reference types="node" />
import { Adapter } from "escpos-adapter";
import { usb } from 'usb';
export default class USBAdapter extends Adapter<[timeout?: number]> {
    constructor(vid?: number, pid?: number);
    static findPrinter(): usb.Device[];
    static getDevice(vid: number, pid: number): Promise<unknown>;
    open(callback?: ((error: Error | null) => void) | undefined): this;
    read(callback?: ((data: Buffer) => void) | undefined): void;
    write(data: string | Buffer, callback?: ((error: Error | null) => void) | undefined): this;
    close(callback?: ((error: Error | null) => void) | undefined, timeout?: number | undefined): this;
}
//# sourceMappingURL=index.d.ts.map