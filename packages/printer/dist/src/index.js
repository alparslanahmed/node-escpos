'use strict';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = exports.Image = exports.Printer = void 0;
const statuses_1 = require("./statuses");
const _ = __importStar(require("./commands"));
const utils = __importStar(require("./utils"));
const image_1 = __importDefault(require("./image"));
const events_1 = __importDefault(require("events"));
const mutable_buffer_1 = require("mutable-buffer");
const get_pixels_1 = __importDefault(require("get-pixels"));
const iconv_lite_1 = __importDefault(require("iconv-lite"));
const qr_image_1 = __importDefault(require("qr-image"));
class Printer extends events_1.default {
    /**
     * [function ESC/POS Printer]
     * @param  {[Adapter]} adapter [eg: usb, network, or serialport]
     * @param {[PrinterOptions]} options
     * @return {[Printer]} printer  [the escpos printer instance]
     */
    constructor(adapter, options) {
        var _a, _b;
        super();
        this.buffer = new mutable_buffer_1.MutableBuffer();
        this._model = null;
        this.adapter = adapter;
        this.options = options;
        this.encoding = (_a = options.encoding) !== null && _a !== void 0 ? _a : 'GB18030';
        this.width = (_b = options.width) !== null && _b !== void 0 ? _b : 48;
    }
    /**
     * Set printer model to recognize model-specific commands.
     * Supported models: [ null, 'qsprinter' ]
     *
     * For generic printers, set model to null
     *
     * [function set printer model]
     * @param  {[String]} model [mandatory]
     * @return {[Printer]} printer  [the escpos printer instance]
     */
    model(model) {
        this._model = model;
        return this;
    }
    /**
     * Set character code table
     * @param  {[Number]} codeTable
     * @return {[Printer]} printer  [the escpos printer instance]
     */
    setCharacterCodeTable(codeTable) {
        this.buffer.write(_.ESC);
        this.buffer.write(_.TAB);
        this.buffer.writeUInt8(codeTable);
        return this;
    }
    ;
    /**
     * Fix bottom margin
     * @param  {[String]} size
     * @return {[Printer]} printer  [the escpos printer instance]
     */
    marginBottom(size) {
        this.buffer.write(_.MARGINS.BOTTOM);
        this.buffer.writeUInt8(size);
        return this;
    }
    ;
    /**
     * Fix left margin
     * @param  {[String]} size
     * @return {[Printer]} printer  [the escpos printer instance]
     */
    marginLeft(size) {
        this.buffer.write(_.MARGINS.LEFT);
        this.buffer.writeUInt8(size);
        return this;
    }
    ;
    /**
     * Fix right margin
     * @param  {[String]} size
     * @return {[Printer]} printer  [the escpos printer instance]
     */
    marginRight(size) {
        this.buffer.write(_.MARGINS.RIGHT);
        this.buffer.writeUInt8(size);
        return this;
    }
    ;
    /**
     * [function print]
     * @param  {[String]}  content  [mandatory]
     * @return {[Printer]} printer  [the escpos printer instance]
     */
    print(content) {
        this.buffer.write(content);
        return this;
    }
    ;
    /**
     * [function print pure content with End Of Line]
     * @param  {[String]}  content  [mandatory]
     * @return {[Printer]} printer  [the escpos printer instance]
     */
    println(content) {
        return this.print(content + _.EOL);
    }
    ;
    /**
     * [function print End Of Line]
     * @return {[Printer]} printer  [the escpos printer instance]
     */
    newLine() {
        return this.print(_.EOL);
    }
    ;
    /**
     * [function Print encoded alpha-numeric text with End Of Line]
     * @param  {[String]}  content  [mandatory]
     * @param  {[String]}  encoding [optional]
     * @return {[Printer]} printer  [the escpos printer instance]
     */
    text(content, encoding = this.encoding) {
        return this.print(iconv_lite_1.default.encode(`${content}${_.EOL}`, encoding));
    }
    ;
    /**
     * [function Print draw line End Of Line]
     * @param  {[String]}  character [optional]
     * @return {[Printer]} printer  [the escpos printer instance]
     */
    drawLine(character = '-') {
        for (let i = 0; i < this.width; i++) {
            this.buffer.write(Buffer.from(character));
        }
        this.newLine();
        return this;
    }
    ;
    /**
     * [function Print  table   with End Of Line]
     * @param  {[data]}  data  [mandatory]
     * @param  {[String]}  encoding [optional]
     * @return {[Printer]} printer  [the escpos printer instance]
     */
    table(data, encoding = this.encoding) {
        const cellWidth = this.width / data.length;
        let lineTxt = "";
        for (let i = 0; i < data.length; i++) {
            lineTxt += data[i].toString();
            const spaces = cellWidth - data[i].toString().length;
            for (let j = 0; j < spaces; j++)
                lineTxt += " ";
        }
        this.buffer.write(iconv_lite_1.default.encode(lineTxt + _.EOL, encoding));
        return this;
    }
    ;
    /**
     * [function Print  custom table  with End Of Line]
     * @param  {[data]}  data  [mandatory]
     * @param  {[String]}  options [optional]
     * @return {[Printer]} printer  [the escpos printer instance]
     */
    tableCustom(data, options = { size: [1, 1], encoding: this.encoding }) {
        let [width, height] = options.size;
        let baseWidth = Math.floor(this.width / width);
        let cellWidth = Math.floor(baseWidth / data.length);
        let leftoverSpace = baseWidth - cellWidth * data.length; // by only data[].width
        let lineStr = '';
        let secondLineEnabled = false;
        let secondLine = [];
        for (let i = 0; i < data.length; i++) {
            const obj = data[i];
            const align = utils.upperCase(obj.align || 'left');
            const textLength = utils.textLength(obj.text);
            if ("width" in obj) {
                cellWidth = baseWidth * obj.width;
            }
            else if (obj.cols) {
                cellWidth = obj.cols / width;
                leftoverSpace = 0;
            }
            let originalText = null;
            if (cellWidth < textLength) {
                originalText = obj.text;
                obj.text = utils.textSubstring(obj.text, 0, cellWidth);
            }
            if (align === 'CENTER') {
                let spaces = (cellWidth - textLength) / 2;
                for (let s = 0; s < spaces; s++)
                    lineStr += ' ';
                if (obj.text !== '') {
                    if (obj.style)
                        lineStr += `${this._getStyle(obj.style)}${obj.text}${this._getStyle("NORMAL")}`;
                    else
                        lineStr += obj.text;
                }
                for (let s = 0; s < spaces - 1; s++)
                    lineStr += ' ';
            }
            else if (align === 'RIGHT') {
                let spaces = cellWidth - textLength;
                if (leftoverSpace > 0) {
                    spaces += leftoverSpace;
                    leftoverSpace = 0;
                }
                for (let s = 0; s < spaces; s++)
                    lineStr += ' ';
                if (obj.text !== '') {
                    if (obj.style)
                        lineStr += `${this._getStyle(obj.style)}${obj.text}${this._getStyle("NORMAL")}`;
                    else
                        lineStr += obj.text;
                }
            }
            else {
                if (obj.text !== '') {
                    if (obj.style)
                        lineStr += `${this._getStyle(obj.style)}${obj.text}${this._getStyle("NORMAL")}`;
                    else
                        lineStr += obj.text;
                }
                let spaces = Math.floor(cellWidth - textLength);
                if (leftoverSpace > 0) {
                    spaces += leftoverSpace;
                    leftoverSpace = 0;
                }
                for (let s = 0; s < spaces; s++)
                    lineStr += ' ';
            }
            if (originalText !== null) {
                secondLineEnabled = true;
                obj.text = utils.textSubstring(originalText, cellWidth);
                secondLine.push(obj);
            }
            else {
                obj.text = '';
                secondLine.push(obj);
            }
        }
        // Set size to line
        if (width > 1 || height > 1) {
            lineStr = (_.TEXT_FORMAT.TXT_CUSTOM_SIZE(width, height) +
                lineStr +
                _.TEXT_FORMAT.TXT_NORMAL);
        }
        // Write the line
        this.buffer.write(iconv_lite_1.default.encode(lineStr + _.EOL, options.encoding || this.encoding));
        if (secondLineEnabled) {
            // Writes second line if has
            return this.tableCustom(secondLine, options);
        }
        else {
            return this;
        }
    }
    /**
     * [function Print encoded alpha-numeric text without End Of Line]
     * @param  {[String]}  content  [mandatory]
     * @param  {[String]}  encoding [optional]
     * @return {[Printer]} printer  [the escpos printer instance]
     */
    pureText(content, encoding = this.encoding) {
        return this.print(iconv_lite_1.default.encode(content, encoding));
    }
    ;
    /**
     * [function encode text]
     * @param  {[String]}  encoding [mandatory]
     * @return {[Printer]} printer  [the escpos printer instance]
     */
    encode(encoding) {
        this.encoding = encoding;
        return this;
    }
    /**
     * [line feed]
     * @param  {[type]}    n   Number of lines
     * @return {[Printer]} printer  [the escpos printer instance]
     */
    feed(n = 1) {
        this.buffer.write(new Array(n).fill(_.EOL).join(''));
        return this;
    }
    ;
    /**
     * [feed control sequences]
     * @param  {[type]}    ctrl     [description]
     * @return {[Printer]} printer  [the escpos printer instance]
     */
    control(ctrl) {
        this.buffer.write(_.FEED_CONTROL_SEQUENCES[`CTL_${utils.upperCase(ctrl)}`]);
        return this;
    }
    ;
    /**
     * [text align]
     * @param  {[type]}    align    [description]
     * @return {[Printer]} printer  [the escpos printer instance]
     */
    align(align) {
        this.buffer.write(_.TEXT_FORMAT[`TXT_ALIGN_${utils.upperCase(align)}`]);
        return this;
    }
    ;
    /**
     * [font family]
     * @param  {[type]}    family  [description]
     * @return {[Printer]} printer  [the escpos printer instance]
     */
    font(family) {
        this.buffer.write(_.TEXT_FORMAT[`TXT_FONT_${utils.upperCase(family)}`]);
        if (family.toUpperCase() === 'A')
            this.width = this.options && this.options.width || 42;
        else
            this.width = this.options && this.options.width || 56;
        return this;
    }
    ;
    _getStyle(boldOrString, italic, underline) {
        if (typeof boldOrString === 'string') {
            switch (utils.upperCase(boldOrString)) {
                case 'B':
                    return this._getStyle(true, false, 0);
                case 'I':
                    return this._getStyle(false, true, 0);
                case 'U':
                    return this._getStyle(false, false, 1);
                case 'U2':
                    return this._getStyle(false, false, 2);
                case 'BI':
                    return this._getStyle(true, true, 0);
                case 'BIU':
                    return this._getStyle(true, true, 1);
                case 'BIU2':
                    return this._getStyle(true, true, 2);
                case 'BU':
                    return this._getStyle(true, false, 1);
                case 'BU2':
                    return this._getStyle(true, false, 2);
                case 'IU':
                    return this._getStyle(false, true, 1);
                case 'IU2':
                    return this._getStyle(false, true, 2);
                case 'NORMAL':
                default:
                    return this._getStyle(false, false, 0);
            }
        }
        else {
            let styled = `${boldOrString ? _.TEXT_FORMAT.TXT_BOLD_ON : _.TEXT_FORMAT.TXT_BOLD_OFF}${italic ? _.TEXT_FORMAT.TXT_ITALIC_ON : _.TEXT_FORMAT.TXT_ITALIC_OFF}`;
            if (underline === 0 || underline === false)
                styled += _.TEXT_FORMAT.TXT_UNDERL_OFF;
            else if (underline === 1 || underline === true)
                styled += _.TEXT_FORMAT.TXT_UNDERL_ON;
            else if (underline === 2)
                styled += _.TEXT_FORMAT.TXT_UNDERL2_ON;
            return styled;
        }
    }
    style(boldOrString, italic, underline) {
        const style = (typeof boldOrString === 'string')
            ? this._getStyle(boldOrString)
            : this._getStyle(boldOrString, italic, underline);
        this.buffer.write(style);
        return this;
    }
    ;
    /**
     * [font size]
     * @param  {[String]}  width   [description]
     * @param  {[String]}  height  [description]
     * @return {[Printer]} printer  [the escpos printer instance]
     */
    size(width, height) {
        this.buffer.write(_.TEXT_FORMAT.TXT_CUSTOM_SIZE(width, height));
        return this;
    }
    ;
    /**
     * [set character spacing]
     * @param  {[type]}    n     [description]
     * @return {[Printer]} printer  [the escpos printer instance]
     */
    spacing(n) {
        if (n === undefined || n === null) {
            this.buffer.write(_.CHARACTER_SPACING.CS_DEFAULT);
        }
        else {
            this.buffer.write(_.CHARACTER_SPACING.CS_SET);
            this.buffer.writeUInt8(n);
        }
        return this;
    }
    /**
     * [set line spacing]
     * @param  {[type]} n [description]
     * @return {[Printer]} printer  [the escpos printer instance]
     */
    lineSpace(n) {
        if (n === undefined || n === null) {
            this.buffer.write(_.LINE_SPACING.LS_DEFAULT);
        }
        else {
            this.buffer.write(_.LINE_SPACING.LS_SET);
            this.buffer.writeUInt8(n);
        }
        return this;
    }
    ;
    /**
     * [hardware]
     * @param  {[type]}    hw       [description]
     * @return {[Printer]} printer  [the escpos printer instance]
     */
    hardware(hw) {
        this.buffer.write(_.HARDWARE[`HW_${utils.upperCase(hw)}`]);
        return this;
    }
    ;
    static isLegacyBarcodeOptions(optionsOrLegacy) {
        return typeof optionsOrLegacy[0] === 'object';
    }
    barcode(code, type, ...optionsOrLegacy) {
        var _a, _b, _c;
        let options;
        if (Printer.isLegacyBarcodeOptions(optionsOrLegacy)) {
            options = {
                width: optionsOrLegacy[0],
                height: optionsOrLegacy[1],
                position: optionsOrLegacy[2],
                font: optionsOrLegacy[3],
                includeParity: true,
            };
        }
        else
            [options] = optionsOrLegacy;
        options.font = (_a = options.font) !== null && _a !== void 0 ? _a : 'a';
        options.position = (_b = options.position) !== null && _b !== void 0 ? _b : 'blw';
        options.includeParity = (_c = options.includeParity) !== null && _c !== void 0 ? _c : true;
        const convertCode = code.toString(10);
        let parityBit = '';
        let codeLength = '';
        if (typeof type === 'undefined' || type === null) {
            throw new TypeError('barcode type is required');
        }
        if (type === 'EAN13' && convertCode.length !== 12) {
            throw new Error('EAN13 Barcode type requires code length 12');
        }
        if (type === 'EAN8' && convertCode.length !== 7) {
            throw new Error('EAN8 Barcode type requires code length 7');
        }
        if (this._model === 'qsprinter') {
            this.buffer.write(_.MODEL.QSPRINTER.BARCODE_MODE.ON);
        }
        if (this._model === 'qsprinter') {
            // qsprinter has no BARCODE_WIDTH command (as of v7.5)
        }
        else if (utils.isKey(options.width, _.BARCODE_FORMAT.BARCODE_WIDTH)) {
            this.buffer.write(_.BARCODE_FORMAT.BARCODE_WIDTH[options.width]);
        }
        else {
            this.buffer.write(_.BARCODE_FORMAT.BARCODE_WIDTH_DEFAULT);
        }
        if (options.height >= 1 && options.height <= 255) {
            this.buffer.write(_.BARCODE_FORMAT.BARCODE_HEIGHT(options.height));
        }
        else {
            if (this._model === 'qsprinter') {
                this.buffer.write(_.MODEL.QSPRINTER.BARCODE_HEIGHT_DEFAULT);
            }
            else {
                this.buffer.write(_.BARCODE_FORMAT.BARCODE_HEIGHT_DEFAULT);
            }
        }
        if (this._model === 'qsprinter') {
            // Qsprinter has no barcode font
        }
        else {
            this.buffer.write(_.BARCODE_FORMAT[`BARCODE_FONT_${utils.upperCase(options.font)}`]);
        }
        this.buffer.write(_.BARCODE_FORMAT[`BARCODE_TXT_${utils.upperCase(options.position)}`]);
        let normalizedType = utils.upperCase(type);
        if (normalizedType === 'UPC-A')
            normalizedType = 'UPC_A';
        else if (normalizedType === 'UPC-E')
            normalizedType = 'UPC_E';
        this.buffer.write(_.BARCODE_FORMAT[`BARCODE_${normalizedType}`]);
        if (options.includeParity) {
            if (type === 'EAN13' || type === 'EAN8') {
                parityBit = utils.getParityBit(convertCode);
            }
        }
        if (type == 'CODE128' || type == 'CODE93') {
            codeLength = utils.codeLength(convertCode);
        }
        this.buffer.write(codeLength + convertCode + (options.includeParity ? parityBit : '') + '\x00'); // Allow to skip the parity byte
        if (this._model === 'qsprinter') {
            this.buffer.write(_.MODEL.QSPRINTER.BARCODE_MODE.OFF);
        }
        return this;
    }
    ;
    /**
     * [print qrcode]
     * @param  {[type]} content    [description]
     * @param  {[type]} version [description]
     * @param  {[type]} level   [description]
     * @param  {[type]} size    [description]
     * @return {[Printer]} printer  [the escpos printer instance]
     */
    qrcode(content, version, level, size) {
        if (this._model !== 'qsprinter') {
            this.buffer.write(_.CODE2D_FORMAT.TYPE_QR);
            this.buffer.write(_.CODE2D_FORMAT.CODE2D);
            this.buffer.writeUInt8(version !== null && version !== void 0 ? version : 3);
            this.buffer.write(_.CODE2D_FORMAT[`QR_LEVEL_${utils.upperCase(level !== null && level !== void 0 ? level : 'L')}`]);
            this.buffer.writeUInt8(size !== null && size !== void 0 ? size : 6);
            this.buffer.writeUInt16LE(content.length);
            this.buffer.write(content);
        }
        else {
            const dataRaw = iconv_lite_1.default.encode(content, 'utf8');
            if (dataRaw.length < 1 && dataRaw.length > 2710) {
                throw new Error('Invalid code length in byte. Must be between 1 and 2710');
            }
            // Set pixel size
            if (!size || (size && typeof size !== 'number'))
                size = _.MODEL.QSPRINTER.CODE2D_FORMAT.PIXEL_SIZE.DEFAULT;
            else if (size && size < _.MODEL.QSPRINTER.CODE2D_FORMAT.PIXEL_SIZE.MIN)
                size = _.MODEL.QSPRINTER.CODE2D_FORMAT.PIXEL_SIZE.MIN;
            else if (size && size > _.MODEL.QSPRINTER.CODE2D_FORMAT.PIXEL_SIZE.MAX)
                size = _.MODEL.QSPRINTER.CODE2D_FORMAT.PIXEL_SIZE.MAX;
            this.buffer.write(_.MODEL.QSPRINTER.CODE2D_FORMAT.PIXEL_SIZE.CMD);
            this.buffer.writeUInt8(size);
            // Set version
            if (!version || (version && typeof version !== 'number'))
                version = _.MODEL.QSPRINTER.CODE2D_FORMAT.VERSION.DEFAULT;
            else if (version && version < _.MODEL.QSPRINTER.CODE2D_FORMAT.VERSION.MIN)
                version = _.MODEL.QSPRINTER.CODE2D_FORMAT.VERSION.MIN;
            else if (version && version > _.MODEL.QSPRINTER.CODE2D_FORMAT.VERSION.MAX)
                version = _.MODEL.QSPRINTER.CODE2D_FORMAT.VERSION.MAX;
            this.buffer.write(_.MODEL.QSPRINTER.CODE2D_FORMAT.VERSION.CMD);
            this.buffer.writeUInt8(version);
            // Set level
            this.buffer.write(_.MODEL.QSPRINTER.CODE2D_FORMAT.LEVEL.CMD);
            this.buffer.write(_.MODEL.QSPRINTER.CODE2D_FORMAT.LEVEL.OPTIONS[utils.upperCase(level !== null && level !== void 0 ? level : 'L')]);
            // Transfer data(code) to buffer
            this.buffer.write(_.MODEL.QSPRINTER.CODE2D_FORMAT.SAVEBUF.CMD_P1);
            this.buffer.writeUInt16LE(dataRaw.length + _.MODEL.QSPRINTER.CODE2D_FORMAT.LEN_OFFSET);
            this.buffer.write(_.MODEL.QSPRINTER.CODE2D_FORMAT.SAVEBUF.CMD_P2);
            this.buffer.write(dataRaw);
            // Print from buffer
            this.buffer.write(_.MODEL.QSPRINTER.CODE2D_FORMAT.PRINTBUF.CMD_P1);
            this.buffer.writeUInt16LE(dataRaw.length + _.MODEL.QSPRINTER.CODE2D_FORMAT.LEN_OFFSET);
            this.buffer.write(_.MODEL.QSPRINTER.CODE2D_FORMAT.PRINTBUF.CMD_P2);
        }
        return this;
    }
    ;
    /**
     * [print qrcode image]
     * @param  {[type]}   text  [description]
     * @param  {[type]}   options  [description]
     * @return {[Promise]}
     */
    qrimage(text, options = { type: 'png', mode: 'dhdw' }) {
        return new Promise((resolve, reject) => {
            const buffer = qr_image_1.default.imageSync(text, options);
            const type = ['image', options.type].join('/');
            (0, get_pixels_1.default)(buffer, type, (err, pixels) => {
                if (err)
                    reject(err);
                this.raster(new image_1.default(pixels), options.mode);
                resolve(this);
            });
        });
    }
    ;
    /**
     * [image description]
     * @param  {[type]} image   [description]
     * @param  {[type]} density [description]
     * @return {[Printer]} printer  [the escpos printer instance]
     */
    async image(image, density = 'd24') {
        if (!(image instanceof image_1.default))
            throw new TypeError('Only escpos.Image supported');
        const n = !!~['D8', 'S8'].indexOf(utils.upperCase(density)) ? 1 : 3;
        const header = _.BITMAP_FORMAT[`BITMAP_${utils.upperCase(density)}`];
        const bitmap = image.toBitmap(n * 8);
        this.lineSpace(0); // set line spacing to 0
        bitmap.data.forEach((line) => {
            this.buffer.write(header);
            this.buffer.writeUInt16LE(line.length / n);
            this.buffer.write(line);
            this.buffer.write(_.EOL);
        });
        // added a delay so the printer can process the graphical data
        // when connected via slower connection ( e.g.: Serial)
        await new Promise((resolve) => {
            setTimeout(() => { resolve(); }, 200);
        });
        return this.lineSpace();
    }
    ;
    /**
     * [raster description]
     * @param  {[type]} image [description]
     * @param  {[type]} mode  Raster mode (
     * @return {[Printer]} printer  [the escpos printer instance]
     */
    raster(image, mode = 'NORMAL') {
        if (!(image instanceof image_1.default))
            throw new TypeError('Only escpos.Image supported');
        mode = utils.upperCase(mode);
        if (mode === 'DHDW' ||
            mode === 'DWH' ||
            mode === 'DHW')
            mode = 'DWDH';
        const raster = image.toRaster();
        const header = _.GSV0_FORMAT[`GSV0_${mode}`];
        this.buffer.write(header);
        this.buffer.writeUInt16LE(raster.width);
        this.buffer.writeUInt16LE(raster.height);
        this.buffer.write(raster.data);
        return this;
    }
    ;
    /**
     * [function Send pulse to kick the cash drawer]
     * @param  {[type]} pin [description]
     * @return {[Printer]} printer  [the escpos printer instance]
     */
    cashdraw(pin = 2) {
        this.buffer.write(_.CASH_DRAWER[pin === 5 ? 'CD_KICK_5' : 'CD_KICK_2']);
        return this;
    }
    ;
    /**
     * Printer Buzzer (Beep sound)
     * @param  {[Number]} n Refers to the number of buzzer times
     * @param  {[Number]} t Refers to the buzzer sound length in (t * 100) milliseconds.
     */
    beep(n, t) {
        this.buffer.write(_.BEEP);
        this.buffer.writeUInt8(n);
        this.buffer.writeUInt8(t);
        return this;
    }
    ;
    /**
     * Send data to hardware and flush buffer
     * @return {[Promise]}
     */
    flush() {
        return new Promise((resolve, reject) => {
            const buf = this.buffer.flush();
            this.adapter.write(buf, (error) => {
                if (error)
                    reject(error);
                else
                    resolve(this);
            });
        });
    }
    ;
    /**
     * Cut paper
     * @param  {[boolean]} partial set a full or partial cut. Default: full Partial cut is not implemented in all printers
     * @param  {[number]} feed Number of lines to feed before cutting
     * @return {[Printer]} printer  [the escpos printer instance]
     */
    cut(partial = false, feed = 3) {
        this.feed(feed);
        this.buffer.write(_.PAPER[partial ? 'PAPER_PART_CUT' : 'PAPER_FULL_CUT']);
        return this;
    }
    ;
    /**
     * [close description]
     * @param closeArgs Arguments passed to adapter's close function
     */
    async close(...closeArgs) {
        await this.flush();
        return new Promise((resolve, reject) => {
            this.adapter.close((error) => {
                if (error)
                    reject(error);
                resolve(this);
            }, ...closeArgs);
        });
    }
    ;
    /**
     * [color select between two print color modes, if your printer supports it]
     * @param  {Number} color - 0 for primary color (black) 1 for secondary color (red)
     * @return {[Printer]} printer  [the escpos printer instance]
     */
    color(color) {
        if (color !== 0 && color !== 1) {
            console.warn(`Unknown color ${color}`);
            this.buffer.write(_.COLOR[0]);
        }
        else
            this.buffer.write(_.COLOR[color]);
        return this;
    }
    ;
    /**
     * [reverse colors, if your printer supports it]
     * @param {Boolean} reverse - True for reverse, false otherwise
     * @return {[Printer]} printer  [the escpos printer instance]
     */
    setReverseColors(reverse) {
        this.buffer.write(reverse ? _.COLOR.REVERSE : _.COLOR.UNREVERSE);
        return this;
    }
    ;
    /**
     * [writes a low level command to the printer buffer]
     *
     * @usage
     * 1) raw('1d:77:06:1d:6b:02:32:32:30:30:30:30:32:30:30:30:35:30:35:00:0a')
     * 2) raw('1d 77 06 1d 6b 02 32 32 30 30 30 30 32 30 30 30 35 30 35 00 0a')
     * 3) raw(Buffer.from('1d77061d6b0232323030303032303030353035000a','hex'))
     *
     * @param data {Buffer|string}
     * @returns {Printer}
     */
    raw(data) {
        if (Buffer.isBuffer(data)) {
            this.buffer.write(data);
        }
        else if (typeof data === 'string') {
            data = data.toLowerCase();
            this.buffer.write(Buffer.from(data.replace(/(\s|:)/g, ''), 'hex'));
        }
        return this;
    }
    ;
    /**
     * get one specific status from the printer using it's class
     * @param  {string} statusClass
     * @return {Promise} promise returning given status
     */
    getStatus(statusClass) {
        return new Promise((resolve) => {
            this.adapter.read(data => {
                const byte = data.readInt8(0);
                resolve(new statusClass(byte));
            });
            statusClass.commands().forEach((c) => {
                this.buffer.write(c);
            });
        });
    }
    /**
     * get statuses from the printer
     * @return {Promise}
     */
    getStatuses() {
        return new Promise((resolve) => {
            this.adapter.read(data => {
                let buffer = [];
                for (let i = 0; i < data.byteLength; i++)
                    buffer.push(data.readInt8(i));
                if (buffer.length < 4)
                    return;
                let statuses = [
                    new statuses_1.PrinterStatus(buffer[0]),
                    new statuses_1.RollPaperSensorStatus(buffer[1]),
                    new statuses_1.OfflineCauseStatus(buffer[2]),
                    new statuses_1.ErrorCauseStatus(buffer[3]),
                ];
                resolve(statuses);
            });
            [statuses_1.PrinterStatus, statuses_1.RollPaperSensorStatus, statuses_1.OfflineCauseStatus, statuses_1.ErrorCauseStatus].forEach((statusClass) => {
                statusClass.commands().forEach((command) => {
                    this.adapter.write(command);
                });
            });
        });
    }
    /**
     * STAR printer - Paper cut instruction
     * @return {[Printer]} printer  [the escpos printer instance]
     */
    starFullCut() {
        this.buffer.write(_.PAPER.STAR_FULL_CUT);
        return this;
    }
    ;
    /**
     * STAR printer - Select emphasized printing
     * @return {[Printer]} printer  [the escpos printer instance]
     */
    emphasize() {
        this.buffer.write(_.TEXT_FORMAT.STAR_TXT_EMPHASIZED);
        return this;
    }
    ;
    /**
     * STAR printer - Cancel emphasized printing
     * @return {[Printer]} printer  [the escpos printer instance]
     */
    cancelEmphasize() {
        this.buffer.write(_.TEXT_FORMAT.STAR_CANCEL_TXT_EMPHASIZED);
        return this;
    }
}
exports.Printer = Printer;
exports.default = Printer;
var image_2 = require("./image");
Object.defineProperty(exports, "Image", { enumerable: true, get: function () { return __importDefault(image_2).default; } });
exports.command = _;
//# sourceMappingURL=index.js.map