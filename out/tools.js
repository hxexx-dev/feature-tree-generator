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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findFirstIncludeName = findFirstIncludeName;
exports.walk = walk;
exports.parseJSON = parseJSON;
const fs = __importStar(require("node:fs"));
const zod_1 = __importDefault(require("zod"));
const logger_1 = require("./logger");
function findFirstIncludeName(dir, name) { for (const dirent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (dirent.name.includes(name))
        return dirent;
} }
function walk(object, path) {
    let current = object;
    for (const property of path) {
        const found = current[property];
        if (found === undefined || found === null || typeof found !== "object") {
            const directory = { "$className": "Folder" };
            current[property] = directory;
            current = directory;
        }
        else {
            current = found;
        }
    }
    return current;
}
function parseJSON(name, schema) {
    let file;
    try {
        file = fs.readFileSync(name, "utf8");
    }
    catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        (0, logger_1.error)(`Failed to read JSON ('${name}'):\n${errorMessage}`);
    }
    const result = schema.safeParse(JSON.parse(file));
    if (!result.success) {
        (0, logger_1.error)(`Failed to parse schema ('${name}'): ${zod_1.default.prettifyError(result.error)}`);
    }
    else
        return result.data;
}
