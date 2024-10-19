'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Adapter = exports.NotImplementedException = void 0;
const EventEmitter = require('events');
class NotImplementedException extends Error {
}
exports.NotImplementedException = NotImplementedException;
class Adapter extends EventEmitter {
}
exports.Adapter = Adapter;
//# sourceMappingURL=index.js.map