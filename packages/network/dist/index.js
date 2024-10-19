'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const net_1 = __importDefault(require("net"));
const escpos_adapter_1 = require("escpos-adapter");
/**
 * Network Adapter
 */
class Network extends escpos_adapter_1.Adapter {
    /**
     * @param {[type]} address
     * @param {[type]} port
     */
    constructor(address, port = 9100, timeout = 30000) {
        super();
        this.address = address;
        this.port = port;
        this.timeout = timeout;
        this.device = new net_1.default.Socket();
    }
    /**
     * connect to remote device
     * @praram {[type]} callback
     * @return
     */
    open(callback) {
        // start timeout on open
        const connection_timeout = setTimeout(() => {
            this.device.destroy();
            callback && callback(new Error(`printer connection timeout after ${this.timeout}ms`), this.device);
        }, this.timeout);
        // connect to net printer by socket (port, ip)
        this.device.on("error", (err) => {
            callback && callback(err, this.device);
        }).on('data', buf => {
            // console.log('printer say:', buf);
        }).connect(this.port, this.address, (err) => {
            clearInterval(connection_timeout);
            this.emit('connect', this.device);
            callback && callback(err !== null && err !== void 0 ? err : null, this.device);
        });
        return this;
    }
    ;
    /**
     * write data to printer
     * @param {[type]} data -- byte data
     * @param {Function} callback
     * @return
     */
    write(data, callback) {
        const handler = (error) => {
            if (callback)
                callback(error !== null && error !== void 0 ? error : null);
        };
        if (typeof data === 'string')
            this.device.write(data, undefined, handler);
        else
            this.device.write(data, handler);
        return this;
    }
    ;
    read(callback) {
        this.device.on('data', buf => {
            if (callback)
                callback(buf);
        });
        return this;
    }
    /**
     * [close description]
     * @param  {Function} callback [description]
     * @return {[type]}            [description]
     */
    close(callback) {
        this.device.destroy();
        this.emit('disconnect', this.device);
        callback && callback(null, this.device);
        return this;
    }
}
exports.default = Network;
//# sourceMappingURL=index.js.map