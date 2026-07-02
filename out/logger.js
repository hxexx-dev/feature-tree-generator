"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = error;
exports.warn = warn;
exports.info = info;
exports.success = success;
const chalk_1 = __importDefault(require("chalk"));
const TOOL_NAME = chalk_1.default.rgb(200, 200, 200)("FeatureTreeGenerator");
const dark = (text) => chalk_1.default.bold.rgb(125, 125, 125)(text);
function prefix(level) { return `${dark("[")}${TOOL_NAME}${dark(":")}${level}${dark("]:")}`; }
function error(...data) { console.error(prefix(chalk_1.default.bgRgb(151, 0, 0).bold.rgb(255, 255, 255)("ERROR💥")), ...data); process.exit(1); }
function warn(...data) { console.log(prefix(chalk_1.default.bold.rgb(255, 217, 0)("WARN🟡")), ...data); }
function info(...data) { console.log(prefix(chalk_1.default.bold.rgb(0, 110, 255)("INFO📘")), ...data); }
function success(...data) { console.log(prefix(chalk_1.default.bold.rgb(0, 255, 13)("SUCCESS✅")), ...data); }
