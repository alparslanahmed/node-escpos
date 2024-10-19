"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isKey = exports.upperCase = exports.textSubstring = exports.textLength = exports.charLength = exports.codeLength = exports.getParityBit = void 0;
/**
 * [getParityBit description]
 * @return {[type]} [description]
 */
function getParityBit(str) {
    let parity = 0;
    let reversedCode = str.split('').reverse().join('');
    for (let counter = 0; counter < reversedCode.length; counter += 1) {
        parity += parseInt(reversedCode.charAt(counter), 10) * Math.pow(3, ((counter + 1) % 2));
    }
    return ((10 - (parity % 10)) % 10).toString();
}
exports.getParityBit = getParityBit;
function codeLength(str) {
    const hex = Number(str.length).toString(16).padStart(2, '0');
    let buff = Buffer.from(hex, 'hex');
    return buff.toString();
}
exports.codeLength = codeLength;
function charLength(char) {
    const code = char.charCodeAt(0);
    return code > 0x7f && code <= 0xffff ? 2 : 1; // More than 2bytes count as 2
}
exports.charLength = charLength;
function textLength(str) {
    return str.split('').reduce((accLen, char) => {
        return accLen + charLength(char);
    }, 0);
}
exports.textLength = textLength;
function textSubstring(str, start, end) {
    let accLen = 0;
    return str.split('').reduce((accStr, char) => {
        accLen = accLen + charLength(char);
        return accStr + (accLen > start && (!end || accLen <= end) ? char : '');
    }, '');
}
exports.textSubstring = textSubstring;
function upperCase(string) {
    return string.toUpperCase();
}
exports.upperCase = upperCase;
function isKey(key, of) {
    return key in of;
}
exports.isKey = isKey;
//# sourceMappingURL=utils.js.map