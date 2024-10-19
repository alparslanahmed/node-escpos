/// <reference types="node" />
import { Adapter } from "escpos-adapter/src";
import { SerialPort } from 'serialport';
/**
 * SerialPort device
 * @param {[type]} port
 * @param {[type]} options
 */
export default class Serial extends Adapter<[timeout?: number]> {
    private device;
    constructor(port: string, options: any);
    /**
     * List Printers
     * @returns {[Array]}
     */
    list(): Promise<import("@serialport/bindings-interface").PortInfo[]>;
    /**
     * open deivce
     * @param  {Function} callback
     * @return {[type]}
     */
    open(callback?: (error: Error | null) => void): this;
    /**
     * write data to serialport device
     * @param  {[type]}   data      [description]
     * @param  {Function} callback [description]
     * @return {[type]}            [description]
     */
    write(data: Buffer | string, callback?: (error: Error | null) => void): this;
    /**
     * close device
     * @param  {Function} callback  [description]
     * @param  {int}      timeout   [allow manual timeout for emulated COM ports (bluetooth, ...)]
     * @return {[type]} [description]
     */
    close(callback?: (error: Error | null, device: SerialPort) => void, timeout?: number): this;
    /**
     * read buffer from the printer
     * @param  {Function} callback
     * @return {Serial}
     */
    read(callback?: (data: Buffer) => void): this;
}
//# sourceMappingURL=index.d.ts.map