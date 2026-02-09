"use strict";
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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.time = exports.strings = exports.reviver = exports.promises = exports.object = exports.net = exports.math = exports.log = exports.utils = exports.cons = exports.collection = exports.bytes = void 0;
exports.bytes = __importStar(require("./bytes"));
exports.collection = __importStar(require("./collection/collection"));
exports.cons = __importStar(require("./cons"));
exports.utils = __importStar(require("./utils/utils"));
exports.log = __importStar(require("./logger"));
exports.math = __importStar(require("./math"));
exports.net = __importStar(require("./net/http/http"));
exports.object = __importStar(require("./object"));
exports.promises = __importStar(require("./promises"));
exports.reviver = __importStar(require("./revivers"));
exports.strings = __importStar(require("./strings"));
exports.time = __importStar(require("./time/time"));
//# sourceMappingURL=index.js.map