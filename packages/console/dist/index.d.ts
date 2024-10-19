/// <reference types="node" />
import { Adapter, NotImplementedException } from "escpos-adapter";
/**
 * [Console description]
 */
export default class Console extends Adapter<[]> {
    handler: (data: (string | Buffer)) => void;
    constructor(handler?: (data: string | Buffer) => void);
    /**
     * [open description]
     * @param  {Function} callback [description]
     * @return {[type]}            [description]
     */
    open(callback?: (error: Error | null) => void): this;
    /**
     * [write description]
     * @param  {[type]} data [description]
     * @param  {Function} callback  [description]
     * @return {[type]}      [description]
     */
    write(data: string | Buffer, callback?: (error: Error | null) => void): this;
    close(callback?: (error: Error | null) => void): this;
    read(): typeof NotImplementedException;
}
//# sourceMappingURL=index.d.ts.map