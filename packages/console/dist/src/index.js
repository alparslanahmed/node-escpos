'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const escpos_adapter_1 = require("escpos-adapter");
/**
 * [stdout description]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
function stdout(data) {
    const bit = 8;
    for (let i = 0; i < data.length; i += bit) {
        let arr = [];
        for (let j = 0; j < bit && i + j < data.length; j++)
            arr.push(data[i + j]);
        arr = arr
            .map((b) => b.toString(16).toUpperCase())
            .map((b) => {
            if (b.length == 1)
                b = '0' + b;
            return b;
        });
        console.log(arr.join(' '));
    }
    console.log();
}
/**
 * [Console description]
 */
class Console extends escpos_adapter_1.Adapter {
    constructor(handler = stdout) {
        super();
        this.handler = handler;
    }
    /**
     * [open description]
     * @param  {Function} callback [description]
     * @return {[type]}            [description]
     */
    open(callback) {
        if (callback)
            callback(null);
        return this;
    }
    ;
    /**
     * [write description]
     * @param  {[type]} data [description]
     * @param  {Function} callback  [description]
     * @return {[type]}      [description]
     */
    write(data, callback) {
        this.handler(data);
        if (callback)
            callback(null);
        return this;
    }
    ;
    close(callback) {
        if (callback)
            callback(null);
        return this;
    }
    read() {
        return escpos_adapter_1.NotImplementedException;
    }
}
exports.default = Console;
//# sourceMappingURL=index.js.map