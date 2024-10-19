'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("escpos-adapter/src");
const serialport_1 = require("serialport");
/**
 * SerialPort device
 * @param {[type]} port
 * @param {[type]} options
 */
class Serial extends src_1.Adapter {
    constructor(port, options) {
        super();
        this.device = new serialport_1.SerialPort({ path: port, ...options });
        this.device.on('close', () => {
            this.emit('disconnect', this.device);
            this.device = null;
        });
    }
    /**
     * List Printers
     * @returns {[Array]}
     */
    async list() {
        const ports = await serialport_1.SerialPort.list();
        return ports;
    }
    /**
     * open deivce
     * @param  {Function} callback
     * @return {[type]}
     */
    open(callback) {
        if (this.device === null)
            throw new Error('Serial port device disconnected');
        this.device.open((error) => {
            if (callback)
                callback(error !== null && error !== void 0 ? error : null);
        });
        return this;
    }
    ;
    /**
     * write data to serialport device
     * @param  {[type]}   data      [description]
     * @param  {Function} callback [description]
     * @return {[type]}            [description]
     */
    write(data, callback) {
        if (this.device === null)
            throw new Error('Serial port device disconnected');
        this.device.write(data, (error) => {
            if (callback)
                callback(error !== null && error !== void 0 ? error : null);
        });
        return this;
    }
    ;
    /**
     * close device
     * @param  {Function} callback  [description]
     * @param  {int}      timeout   [allow manual timeout for emulated COM ports (bluetooth, ...)]
     * @return {[type]} [description]
     */
    close(callback, timeout = 0) {
        const device = this.device;
        if (device === null)
            return this;
        device.drain(() => {
            device.flush((err) => {
                setTimeout(() => {
                    err ? callback && callback(err, device) : device.close((err) => {
                        this.device = null;
                        if (callback)
                            callback(err !== null && err !== void 0 ? err : null, device);
                    });
                }, Math.max(timeout, 0));
            });
        });
        return this;
    }
    ;
    /**
     * read buffer from the printer
     * @param  {Function} callback
     * @return {Serial}
     */
    read(callback) {
        if (this.device === null)
            throw new Error('Serial port device disconnected');
        this.device.on('data', function (data) {
            if (callback)
                callback(data);
        });
        return this;
    }
    ;
}
exports.default = Serial;
//# sourceMappingURL=index.js.map