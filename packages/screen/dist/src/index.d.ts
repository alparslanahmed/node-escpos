/// <reference types="node" />
import { Adapter } from "escpos-adapter";
export interface ScreenOptions {
    encoding?: string | undefined;
}
/**
 * [function ESC/POS Screen]
 */
export default class Screen<T extends unknown[]> {
    private adapter;
    private buffer;
    private encoding;
    /**
     * @param  {[Adapter]} adapter [eg: usb, network, or serialport]
     * @param  {[ScreenOptions]} options
     * @return {[Screen]} Screen  [the escpos Screen instance]
     */
    constructor(adapter: Adapter<T>, options?: ScreenOptions);
    /**
     * Clears all displayed characters
     * @return {[Screen]} Screen  [the escpos Screen instance]
     */
    clear(): this;
    /**
     * Clears the line containing the cursor
     * @return {[Screen]} Screen  [the escpos Screen instance]
     */
    clearLine(): this;
    /**
     * Moves the cursor up one line
     * @return {[Screen]} Screen  [the escpos Screen instance]
     */
    moveUp(): this;
    /**
     * Moves the cursor one character position to the left
     * @return {[Screen]} Screen  [the escpos Screen instance]
     */
    moveLeft(): this;
    /**
     * Moves the cursor one character position to the right
     * @return {[Screen]} Screen  [the escpos Screen instance]
     */
    moveRight(): this;
    /**
     * Moves the cursor down one line
     * @return {[Screen]} Screen  [the escpos Screen instance]
     */
    moveDown(): this;
    /**
     * Moves the cursor to the left-most position on the upper line (home position)
     * @return {[Screen]} Screen  [the escpos Screen instance]
     */
    moveHome(): this;
    /**
     * Moves the cursor to the right-most position on the current line
     * @return {[Screen]} Screen  [the escpos Screen instance]
     */
    moveMaxRight(): this;
    /**
     * Moves the cursor to the left-most position on the current line
     * @return {[Screen]} Screen  [the escpos Screen instance]
     */
    moveMaxLeft(): this;
    /**
     * Moves the cursor to the bottom position
     * @return {[Screen]} Screen  [the escpos Screen instance]
     */
    moveBottom(): this;
    /**
     * Moves the cursor to the nth position on the mth line
     * @param  {[type]}   n       [description]
     * @param  {[type]}   m       [description]
     * @return {[Screen]} Screen  [the escpos Screen instance]
     */
    move(n: number, m: number): this;
    /**
     * Selects overwrite mode as the screen display mode
     * @return {[Screen]} Screen  [the escpos Screen instance]
     */
    overwrite(): this;
    /**
     * Selects vertical scroll mode as the screen display mode
     * @return {[Screen]} Screen  [the escpos Screen instance]
     */
    verticalScroll(): this;
    /**
     * Selects horizontal scroll mode as the display screen mode
     * @return {[Screen]} Screen  [the escpos Screen instance]
     */
    horizontalScroll(): this;
    /**
     * Turn cursor display mode on/off
     * @param  {[type]}   visible [description]
     * @return {[Screen]} Screen  [the escpos Screen instance]
     */
    cursor(visible: boolean): this;
    /**
     * Sets display screen blank interval
     * @param  {[type]}   step    [description]
     * @return {[Screen]} Screen  [the escpos Screen instance]
     */
    blink(step: number): this;
    /**
     * Sets the counter time and displays it in the bottom right of the screen
     * @param  {[type]}   h       [description]
     * @param  {[type]}   m       [description]
     * @return {[Screen]} Screen  [the escpos Screen instance]
     */
    timer(h: number, m: number): this;
    /**
     * Displays the time counter at the right side of the bottom line
     * @return {[Screen]} Screen  [the escpos Screen instance]
     */
    displayTimer(): this;
    /**
     * Set brightness
     * @param  {[type]}   level   [description]
     * @return {[Screen]} Screen  [the escpos Screen instance]
     */
    brightness(level: number): this;
    /**
     * Selects or cancels reverse display of the characters received after this command
     * @param  {[type]}   enable       [description]
     * @return {[Screen]} Screen  [the escpos Screen instance]
     */
    reverse(enable: boolean): this;
    /**
     * Set status confirmation for DTR signal
     * @param  {[type]}   n       [description]
     * @return {[Screen]} Screen  [the escpos Screen instance]
     */
    DTR(n: boolean): this;
    /**
     * [function print]
     * @param  {[String]}  content  [mandatory]
     * @return {[Screen]} Screen  [the escpos Screen instance]
     */
    print(content: string | Buffer): this;
    /**
     * [function Print encoded alpha-numeric text with End Of Line]
     * @param  {[String]}  content  [mandatory]
     * @param  {[String]}  encoding [optional]
     * @return {[Screen]} Screen  [the escpos Screen instance]
     */
    text(content: string, encoding?: string): this;
    /**
     * [function encode text]
     * @param  {[String]}  encoding [mandatory]
     * @return {[Screen]} Screen  [the escpos Screen instance]
     */
    encode(encoding: string): this;
    /**
     * Send data to hardware and flush buffer
     * @return {[Screen]} printer  [the escpos printer instance]
     */
    flush(): this;
    /**
     * [close description]
     * @param  {Function} callback [description]
     * @param  {[type]}   closeArgs  [description]
     * @return {[type]}            [description]
     */
    close(callback: (error: Error | null) => void, ...closeArgs: T): void;
}
//# sourceMappingURL=index.d.ts.map