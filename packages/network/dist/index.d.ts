/// <reference types="node" />
/// <reference types="node" />
import net from "net";
import { Adapter } from "escpos-adapter";
/**
 * Network Adapter
 */
export default class Network extends Adapter<[device: net.Socket]> {
    private readonly address;
    private readonly port;
    private readonly timeout;
    private readonly device;
    /**
     * @param {[type]} address
     * @param {[type]} port
     */
    constructor(address: string, port?: number, timeout?: number);
    /**
     * connect to remote device
     * @praram {[type]} callback
     * @return
     */
    open(callback?: (error: Error | null, device: net.Socket) => void): this;
    /**
     * write data to printer
     * @param {[type]} data -- byte data
     * @param {Function} callback
     * @return
     */
    write(data: string | Buffer, callback?: (error: Error | null) => void): this;
    read(callback?: (data: Buffer) => void): this;
    /**
     * [close description]
     * @param  {Function} callback [description]
     * @return {[type]}            [description]
     */
    close(callback?: (error: Error | null, device: net.Socket) => void): this;
}
//# sourceMappingURL=index.d.ts.map