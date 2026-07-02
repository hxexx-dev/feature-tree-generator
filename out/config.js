"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = getConfig;
const zod_1 = __importDefault(require("zod"));
const tools_1 = require("./tools");
const CONFIG_FILE_NAME = "gentree.config.json";
const CONFIG_SCHEMA = zod_1.default.object({
    baseTreePath: zod_1.default.string(),
    projectFileName: zod_1.default.string(), outputTabWidth: zod_1.default.int(), featuresExplorerPath: zod_1.default.string(), environments: zod_1.default.record(zod_1.default.string(), zod_1.default.array(zod_1.default.string()))
});
function getConfig() { return (0, tools_1.parseJSON)(CONFIG_FILE_NAME, CONFIG_SCHEMA); }
