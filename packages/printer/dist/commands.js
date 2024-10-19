"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COLOR = exports.BEEP = exports.GSV0_FORMAT = exports.BITMAP_FORMAT = exports.IMAGE_FORMAT = exports.CODE2D_FORMAT = exports.BARCODE_FORMAT = exports.MODEL = exports.TEXT_FORMAT = exports.PAPER = exports.MARGINS = exports.CASH_DRAWER = exports.HARDWARE = exports.LINE_SPACING = exports.CHARACTER_SPACING = exports.FEED_CONTROL_SEQUENCES = exports.EOL = exports.TAB = exports.ESC = exports.NUL = exports.EOT = exports.DLE = exports.GS = exports.FF = exports.FS = exports.LF = void 0;
/**
 * Utility function that converts numbers into hex values
 *
 * @usage:
 *   numToHex(256) => '0100'
 *   numToHex(0) => '00'
 */
const numToHexString = function (value) {
    value = +value;
    if (!isNaN(value)) {
        value = (value).toString(16);
        while (value.length % 2 !== 0) {
            value = '0' + value;
        }
    }
    return value;
};
exports.LF = '\x0a';
exports.FS = '\x1c';
exports.FF = '\x0c';
exports.GS = '\x1d';
exports.DLE = '\x10';
exports.EOT = '\x04';
exports.NUL = '\x00';
exports.ESC = '\x1b';
exports.TAB = '\x74';
exports.EOL = '\n';
/**
 * [FEED_CONTROL_SEQUENCES Feed control sequences]
 * @type {Object}
 */
exports.FEED_CONTROL_SEQUENCES = {
    CTL_LF: '\x0a',
    CTL_GLF: '\x4a\x00',
    CTL_FF: '\x0c',
    CTL_CR: '\x0d',
    CTL_HT: '\x09',
    CTL_VT: '\x0b', // Vertical tab
};
exports.CHARACTER_SPACING = {
    CS_DEFAULT: '\x1b\x20\x00',
    CS_SET: '\x1b\x20'
};
exports.LINE_SPACING = {
    LS_DEFAULT: '\x1b\x32',
    LS_SET: '\x1b\x33'
};
/**
 * [HARDWARE Printer hardware]
 * @type {Object}
 */
exports.HARDWARE = {
    HW_INIT: '\x1b\x40',
    HW_SELECT: '\x1b\x3d\x01',
    HW_RESET: '\x1b\x3f\x0a\x00', // Reset printer hardware
};
/**
 * [CASH_DRAWER Cash Drawer]
 * @type {Object}
 */
exports.CASH_DRAWER = {
    CD_KICK_2: '\x1b\x70\x00\x19\x78',
    CD_KICK_5: '\x1b\x70\x01\x19\x78', // Sends a pulse to pin 5 []
};
/**
 * [MARGINS Margins sizes]
 * @type {Object}
 */
exports.MARGINS = {
    BOTTOM: '\x1b\x4f',
    LEFT: '\x1b\x6c',
    RIGHT: '\x1b\x51', // Fix right size
};
/**
 * [PAPER Paper]
 * @type {Object}
 */
exports.PAPER = {
    PAPER_FULL_CUT: '\x1d\x56\x00',
    PAPER_PART_CUT: '\x1d\x56\x01',
    PAPER_CUT_A: '\x1d\x56\x41',
    PAPER_CUT_B: '\x1d\x56\x42',
    STAR_FULL_CUT: '\x1B\x64\x02', // STAR printer - Full cut
};
/**
 * [TEXT_FORMAT Text format]
 * @type {Object}
 */
exports.TEXT_FORMAT = {
    TXT_NORMAL: '\x1b\x21\x00',
    TXT_2HEIGHT: '\x1b\x21\x10',
    TXT_2WIDTH: '\x1b\x21\x20',
    TXT_4SQUARE: '\x1b\x21\x30',
    STAR_TXT_EMPHASIZED: '\x1B\x45',
    STAR_CANCEL_TXT_EMPHASIZED: '\x1B\x46',
    TXT_CUSTOM_SIZE: function (width, height) {
        width = width > 8 ? 8 : width;
        width = width < 1 ? 1 : width;
        height = height > 8 ? 8 : height;
        height = height < 1 ? 1 : height;
        var widthDec = (width - 1) * 16; // Values between 1-8
        var heightDec = height - 1; // Values between 1-8
        var sizeDec = widthDec + heightDec;
        /*
        * @todo I would suggest replacing the return line by the code below since
        *         `String.fromCharCode()` can generate undesirable results.
        *
        * return Buffer.from('1d21' + numToHexString(sizeDec), 'hex');
        * */
        return '\x1d\x21' + String.fromCharCode(sizeDec);
    },
    TXT_HEIGHT: {
        1: '\x00',
        2: '\x01',
        3: '\x02',
        4: '\x03',
        5: '\x04',
        6: '\x05',
        7: '\x06',
        8: '\x07'
    },
    TXT_WIDTH: {
        1: '\x00',
        2: '\x10',
        3: '\x20',
        4: '\x30',
        5: '\x40',
        6: '\x50',
        7: '\x60',
        8: '\x70'
    },
    TXT_UNDERL_OFF: '\x1b\x2d\x00',
    TXT_UNDERL_ON: '\x1b\x2d\x01',
    TXT_UNDERL2_ON: '\x1b\x2d\x02',
    TXT_BOLD_OFF: '\x1b\x45\x00',
    TXT_BOLD_ON: '\x1b\x45\x01',
    TXT_ITALIC_OFF: '\x1b\x35',
    TXT_ITALIC_ON: '\x1b\x34',
    TXT_FONT_A: '\x1b\x4d\x00',
    TXT_FONT_B: '\x1b\x4d\x01',
    TXT_FONT_C: '\x1b\x4d\x02',
    TXT_ALIGN_LT: '\x1b\x61\x00',
    TXT_ALIGN_CT: '\x1b\x61\x01',
    TXT_ALIGN_RT: '\x1b\x61\x02',
    STAR_TXT_ALIGN_LA: '\x1B\x1D\x61\x00',
    STAR_TXT_ALIGN_CA: '\x1B\x1D\x61\x01',
    STAR_TXT_ALIGN_RA: '\x1B\x1D\x61\x02', // STAR printer - Right alignment
};
/**
 * Qsprinter-compatible
 * Added by Attawit Kittikrairit
 * [MODEL Model-specific commands]
 * @type {Object}
 */
exports.MODEL = {
    QSPRINTER: {
        BARCODE_MODE: {
            ON: '\x1d\x45\x43\x01',
            OFF: '\x1d\x45\x43\x00', // Barcode mode off
        },
        BARCODE_HEIGHT_DEFAULT: '\x1d\x68\xA2',
        CODE2D_FORMAT: {
            PIXEL_SIZE: {
                CMD: '\x1b\x23\x23\x51\x50\x49\x58',
                MIN: 1,
                MAX: 24,
                DEFAULT: 12,
            },
            VERSION: {
                CMD: '\x1d\x28\x6b\x03\x00\x31\x43',
                MIN: 1,
                MAX: 16,
                DEFAULT: 3,
            },
            LEVEL: {
                CMD: '\x1d\x28\x6b\x03\x00\x31\x45',
                OPTIONS: {
                    L: 48,
                    M: 49,
                    Q: 50,
                    H: 51,
                }
            },
            LEN_OFFSET: 3,
            SAVEBUF: {
                // Format: CMD_P1{LEN_2BYTE}CMD_P2{DATA}
                // DATA Max Length: 256*256 - 3 (65533)
                CMD_P1: '\x1d\x28\x6b',
                CMD_P2: '\x31\x50\x30',
            },
            PRINTBUF: {
                // Format: CMD_P1{LEN_2BYTE}CMD_P2
                CMD_P1: '\x1d\x28\x6b',
                CMD_P2: '\x31\x51\x30',
            }
        },
    },
};
/**
 * [BARCODE_FORMAT Barcode format]
 * @type {Object}
 */
exports.BARCODE_FORMAT = {
    BARCODE_TXT_OFF: '\x1d\x48\x00',
    BARCODE_TXT_ABV: '\x1d\x48\x01',
    BARCODE_TXT_BLW: '\x1d\x48\x02',
    BARCODE_TXT_BTH: '\x1d\x48\x03',
    BARCODE_FONT_A: '\x1d\x66\x00',
    BARCODE_FONT_B: '\x1d\x66\x01',
    BARCODE_HEIGHT: function (height) {
        return Buffer.from('1d68' + numToHexString(height), 'hex');
    },
    // Barcode Width  [2-6]
    BARCODE_WIDTH: {
        1: '\x1d\x77\x02',
        2: '\x1d\x77\x03',
        3: '\x1d\x77\x04',
        4: '\x1d\x77\x05',
        5: '\x1d\x77\x06',
    },
    BARCODE_HEIGHT_DEFAULT: '\x1d\x68\x64',
    BARCODE_WIDTH_DEFAULT: '\x1d\x77\x01',
    BARCODE_UPC_A: '\x1d\x6b\x00',
    BARCODE_UPC_E: '\x1d\x6b\x01',
    BARCODE_EAN13: '\x1d\x6b\x02',
    BARCODE_EAN8: '\x1d\x6b\x03',
    BARCODE_CODE39: '\x1d\x6b\x04',
    BARCODE_ITF: '\x1d\x6b\x05',
    BARCODE_NW7: '\x1d\x6b\x06',
    BARCODE_CODE93: '\x1d\x6b\x48',
    BARCODE_CODE128: '\x1d\x6b\x49', // Barcode type CODE128
};
/**
 * [CODE2D_FORMAT description]
 * @type {Object}
 */
exports.CODE2D_FORMAT = {
    TYPE_PDF417: exports.GS + 'Z' + '\x00',
    TYPE_DATAMATRIX: exports.GS + 'Z' + '\x01',
    TYPE_QR: exports.GS + 'Z' + '\x02',
    CODE2D: exports.ESC + 'Z',
    QR_LEVEL_L: 'L',
    QR_LEVEL_M: 'M',
    QR_LEVEL_Q: 'Q',
    QR_LEVEL_H: 'H' // correct level 30%
};
/**
 * [IMAGE_FORMAT Image format]
 * @type {Object}
 */
exports.IMAGE_FORMAT = {
    S_RASTER_N: '\x1d\x76\x30\x00',
    S_RASTER_2W: '\x1d\x76\x30\x01',
    S_RASTER_2H: '\x1d\x76\x30\x02',
    S_RASTER_Q: '\x1d\x76\x30\x03', // Set raster image quadruple
};
/**
 * [BITMAP_FORMAT description]
 * @type {Object}
 */
exports.BITMAP_FORMAT = {
    BITMAP_S8: '\x1b\x2a\x00',
    BITMAP_D8: '\x1b\x2a\x01',
    BITMAP_S24: '\x1b\x2a\x20',
    BITMAP_D24: '\x1b\x2a\x21'
};
/**
 * [GSV0_FORMAT description]
 * @type {Object}
 */
exports.GSV0_FORMAT = {
    GSV0_NORMAL: '\x1d\x76\x30\x00',
    GSV0_DW: '\x1d\x76\x30\x01',
    GSV0_DH: '\x1d\x76\x30\x02',
    GSV0_DWDH: '\x1d\x76\x30\x03'
};
/**
 * [BEEP description]
 * @type {string}
 */
exports.BEEP = '\x1b\x42'; // Printer Buzzer pre hex
/**
 * [COLOR description]
 * @type {Object}
 */
exports.COLOR = {
    0: '\x1b\x72\x00',
    1: '\x1b\x72\x01',
    REVERSE: '\x1dB1',
    UNREVERSE: '\x1dB0' // Default: undo the reverse - black text on white background
};
//# sourceMappingURL=commands.js.map