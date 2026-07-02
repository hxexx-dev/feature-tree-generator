"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BASETREE_SCHEMA = void 0;
const zod_1 = __importDefault(require("zod"));
exports.BASETREE_SCHEMA = zod_1.default.object({ name: zod_1.default.string(), tree: zod_1.default.object({ "$className": zod_1.default.literal("DataModel") }).loose() });
