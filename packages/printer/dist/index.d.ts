/// <reference types="node" />
/// <reference types="node" />
import { Adapter } from "escpos-adapter";
import { DeviceStatus, StatusClassConstructor } from "./statuses";
import * as _ from "./commands";
import Image from "./image";
import EventEmitter from "events";
import { MutableBuffer } from "mutable-buffer";
import qr from "qr-image";
import { AnyCase } from "./utils";
export interface PrinterOptions {
    encoding?: string | undefined;
    width?: number | undefined;
}
export declare type PrinterModel = null | 'qsprinter';
/**
 * 'dhdw', 'dwh' and 'dhw' are treated as 'dwdh'
 */
export declare type RasterMode = AnyCase<'normal' | 'dw' | 'dh' | 'dwdh' | 'dhdw' | 'dwh' | 'dhw'>;
export interface QrImageOptions extends qr.Options {
    mode: RasterMode;
}
export declare type BitmapDensity = AnyCase<'s8' | 'd8' | 's24' | 'd24'>;
export declare type StyleString = AnyCase<'normal' | `${'b' | ''}${'i' | ''}${'u' | 'u2' | ''}`>;
export declare type FeedControlSequence = AnyCase<'lf' | 'glf' | 'ff' | 'cr' | 'ht' | 'vt'>;
export declare type Alignment = AnyCase<'lt' | 'ct' | 'rt'>;
export declare type FontFamily = AnyCase<'a' | 'b' | 'c'>;
export declare type HardwareCommand = AnyCase<'init' | 'select' | 'reset'>;
export declare type BarcodeType = AnyCase<'UPC_A' | 'UPC-A' | 'UPC-E' | 'UPC_E' | 'EAN13' | 'EAN8' | 'CODE39' | 'ITF' | 'NW7' | 'CODE93' | 'CODE128'>;
export declare type BarcodePosition = AnyCase<'off' | 'abv' | 'blw' | 'bth'>;
export declare type BarcodeFont = AnyCase<'a' | 'b'>;
export interface BarcodeOptions {
    width: number;
    height: number;
    position?: BarcodePosition | undefined;
    font?: BarcodeFont | undefined;
    includeParity?: boolean | undefined;
}
export declare type LegacyBarcodeArguments = [
    width: number,
    height: number,
    position?: BarcodePosition | undefined,
    font?: BarcodeFont | undefined
];
export declare type QRLevel = AnyCase<'l' | 'm' | 'q' | 'h'>;
export declare type TableAlignment = AnyCase<'left' | 'center' | 'right'>;
export declare type CustomTableItem = {
    text: string;
    align?: TableAlignment;
    style?: StyleString | undefined;
} & ({
    width: number;
} | {
    cols: number;
});
export interface CustomTableOptions {
    size: [number, number];
    encoding: string;
}
export declare class Printer<AdapterCloseArgs extends []> extends EventEmitter {
    adapter: Adapter<AdapterCloseArgs>;
    buffer: MutableBuffer;
    protected options: PrinterOptions;
    protected encoding: string;
    protected width: number;
    protected _model: PrinterModel;
    /**
     * [function ESC/POS Printer]
     * @param  {[Adapter]} adapter [eg: usb, network, or serialport]
     * @param {[PrinterOptions]} options
     * @return {[Printer]} printer  [the escpos printer instance]
     */
    constructor(adapter: Adapter<AdapterCloseArgs>, options: PrinterOptions);
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
    model(model: PrinterModel): this;
    /**
     * Set character code table
     * @param  {[Number]} codeTable
     * @return {[Printer]} printer  [the escpos printer instance]
     */
    setCharacterCodeTable(codeTable: number): this;
    /**
     * Fix bottom margin
     * @param  {[String]} size
     * @return {[Printer]} printer  [the escpos printer instance]
     */
    marginBottom(size: number): this;
    /**
     * Fix left margin
     * @param  {[String]} size
     * @return {[Printer]} printer  [the escpos printer instance]
     */
    marginLeft(size: number): this;
    /**
     * Fix right margin
     * @param  {[String]} size
     * @return {[Printer]} printer  [the escpos printer instance]
     */
    marginRight(size: number): this;
    /**
     * [function print]
     * @param  {[String]}  content  [mandatory]
     * @return {[Printer]} printer  [the escpos printer instance]
     */
    print(content: string | Buffer): this;
    /**
     * [function print pure content with End Of Line]
     * @param  {[String]}  content  [mandatory]
     * @return {[Printer]} printer  [the escpos printer instance]
     */
    println(content: string): this;
    /**
     * [function print End Of Line]
     * @return {[Printer]} printer  [the escpos printer instance]
     */
    newLine(): this;
    /**
     * [function Print encoded alpha-numeric text with End Of Line]
     * @param  {[String]}  content  [mandatory]
     * @param  {[String]}  encoding [optional]
     * @return {[Printer]} printer  [the escpos printer instance]
     */
    text(content: string, encoding?: string): this;
    /**
     * [function Print draw line End Of Line]
     * @param  {[String]}  character [optional]
     * @return {[Printer]} printer  [the escpos printer instance]
     */
    drawLine(character?: string): this;
    /**
     * [function Print  table   with End Of Line]
     * @param  {[data]}  data  [mandatory]
     * @param  {[String]}  encoding [optional]
     * @return {[Printer]} printer  [the escpos printer instance]
     */
    table(data: (string | number)[], encoding?: string): this;
    /**
     * [function Print  custom table  with End Of Line]
     * @param  {[data]}  data  [mandatory]
     * @param  {[String]}  options [optional]
     * @return {[Printer]} printer  [the escpos printer instance]
     */
    tableCustom(data: CustomTableItem[], options?: CustomTableOptions): this;
    /**
     * [function Print encoded alpha-numeric text without End Of Line]
     * @param  {[String]}  content  [mandatory]
     * @param  {[String]}  encoding [optional]
     * @return {[Printer]} printer  [the escpos printer instance]
     */
    pureText(content: string, encoding?: string): this;
    /**
     * [function encode text]
     * @param  {[String]}  encoding [mandatory]
     * @return {[Printer]} printer  [the escpos printer instance]
     */
    encode(encoding: string): this;
    /**
     * [line feed]
     * @param  {[type]}    n   Number of lines
     * @return {[Printer]} printer  [the escpos printer instance]
     */
    feed(n?: number): this;
    /**
     * [feed control sequences]
     * @param  {[type]}    ctrl     [description]
     * @return {[Printer]} printer  [the escpos printer instance]
     */
    control(ctrl: FeedControlSequence): this;
    /**
     * [text align]
     * @param  {[type]}    align    [description]
     * @return {[Printer]} printer  [the escpos printer instance]
     */
    align(align: Alignment): this;
    /**
     * [font family]
     * @param  {[type]}    family  [description]
     * @return {[Printer]} printer  [the escpos printer instance]
     */
    font(family: FontFamily): this;
    /**
     * [font style]
     * @return {[Printer]} printer  [the escpos printer instance]
     */
    _getStyle(string: StyleString): string;
    _getStyle(bold: boolean, italic: boolean, underline: boolean | 0 | 1 | 2): string;
    /**
     * [font style]
     * @return {[Printer]} printer  [the escpos printer instance]
     */
    style(string: StyleString): this;
    style(bold: boolean, italic: boolean, underline: boolean | 0 | 1 | 2): this;
    /**
     * [font size]
     * @param  {[String]}  width   [description]
     * @param  {[String]}  height  [description]
     * @return {[Printer]} printer  [the escpos printer instance]
     */
    size(width: number, height: number): this;
    /**
     * [set character spacing]
     * @param  {[type]}    n     [description]
     * @return {[Printer]} printer  [the escpos printer instance]
     */
    spacing(n?: number | null): this;
    /**
     * [set line spacing]
     * @param  {[type]} n [description]
     * @return {[Printer]} printer  [the escpos printer instance]
     */
    lineSpace(n?: number | null): this;
    /**
     * [hardware]
     * @param  {[type]}    hw       [description]
     * @return {[Printer]} printer  [the escpos printer instance]
     */
    hardware(hw: HardwareCommand): this;
    private static isLegacyBarcodeOptions;
    /**
     * [barcode]
     * @param  {[type]}    code     [description]
     * @param  {[type]}    type     [description]
     * @param  {[type]}    options  [description]
     * @return {[Printer]} printer  [the escpos printer instance]
     */
    barcode(code: number, type: BarcodeType, options: BarcodeOptions): this;
    /**
     * [print qrcode]
     * @param  {[type]} content    [description]
     * @param  {[type]} version [description]
     * @param  {[type]} level   [description]
     * @param  {[type]} size    [description]
     * @return {[Printer]} printer  [the escpos printer instance]
     */
    qrcode(content: string, version?: number | undefined, level?: QRLevel | undefined, size?: number | undefined): this;
    /**
     * [print qrcode image]
     * @param  {[type]}   text  [description]
     * @param  {[type]}   options  [description]
     * @return {[Promise]}
     */
    qrimage(text: string, options?: QrImageOptions): Promise<this>;
    /**
     * [image description]
     * @param  {[type]} image   [description]
     * @param  {[type]} density [description]
     * @return {[Printer]} printer  [the escpos printer instance]
     */
    image(image: Image, density?: BitmapDensity): Promise<this>;
    /**
     * [raster description]
     * @param  {[type]} image [description]
     * @param  {[type]} mode  Raster mode (
     * @return {[Printer]} printer  [the escpos printer instance]
     */
    raster(image: Image, mode?: RasterMode): this;
    /**
     * [function Send pulse to kick the cash drawer]
     * @param  {[type]} pin [description]
     * @return {[Printer]} printer  [the escpos printer instance]
     */
    cashdraw(pin?: 2 | 5): this;
    /**
     * Printer Buzzer (Beep sound)
     * @param  {[Number]} n Refers to the number of buzzer times
     * @param  {[Number]} t Refers to the buzzer sound length in (t * 100) milliseconds.
     */
    beep(n: number, t: number): this;
    /**
     * Send data to hardware and flush buffer
     * @return {[Promise]}
     */
    flush(): Promise<this>;
    /**
     * Cut paper
     * @param  {[boolean]} partial set a full or partial cut. Default: full Partial cut is not implemented in all printers
     * @param  {[number]} feed Number of lines to feed before cutting
     * @return {[Printer]} printer  [the escpos printer instance]
     */
    cut(partial?: boolean, feed?: number): this;
    /**
     * [close description]
     * @param closeArgs Arguments passed to adapter's close function
     */
    close(...closeArgs: AdapterCloseArgs): Promise<this>;
    /**
     * [color select between two print color modes, if your printer supports it]
     * @param  {Number} color - 0 for primary color (black) 1 for secondary color (red)
     * @return {[Printer]} printer  [the escpos printer instance]
     */
    color(color: 0 | 1): this;
    /**
     * [reverse colors, if your printer supports it]
     * @param {Boolean} reverse - True for reverse, false otherwise
     * @return {[Printer]} printer  [the escpos printer instance]
     */
    setReverseColors(reverse: boolean): this;
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
    raw(data: Buffer | string): this;
    /**
     * get one specific status from the printer using it's class
     * @param  {string} statusClass
     * @return {Promise} promise returning given status
     */
    getStatus<T extends DeviceStatus>(statusClass: StatusClassConstructor<T>): Promise<T>;
    /**
     * get statuses from the printer
     * @return {Promise}
     */
    getStatuses(): Promise<unknown>;
    /**
     * STAR printer - Paper cut instruction
     * @return {[Printer]} printer  [the escpos printer instance]
     */
    starFullCut(): this;
    /**
     * STAR printer - Select emphasized printing
     * @return {[Printer]} printer  [the escpos printer instance]
     */
    emphasize(): this;
    /**
     * STAR printer - Cancel emphasized printing
     * @return {[Printer]} printer  [the escpos printer instance]
     */
    cancelEmphasize(): this;
}
export default Printer;
export { default as Image } from './image';
export declare const command: typeof _;
//# sourceMappingURL=index.d.ts.map