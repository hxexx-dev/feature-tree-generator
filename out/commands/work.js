"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.work = work;
const node_path_1 = require("node:path");
const tools_1 = require("../tools");
const node_fs_1 = require("node:fs");
const config_1 = require("../config");
const logger_1 = require("../logger");
const chalk_1 = __importDefault(require("chalk"));
const baseTree_1 = require("../baseTree");
function work() {
    const config = (0, config_1.getConfig)();
    const featuresExplorerPath = config.featuresExplorerPath;
    const tree = structuredClone((0, tools_1.parseJSON)(config.baseTreePath, baseTree_1.BASETREE_SCHEMA));
    for (const feature of (0, node_fs_1.readdirSync)(featuresExplorerPath, { withFileTypes: true })) {
        const featureExplorerPath = (0, node_path_1.join)(featuresExplorerPath, feature.name);
        if (feature.isDirectory()) {
            for (const [env, instanceTreePath] of Object.entries(config.environments)) {
                const dirent = (0, tools_1.findFirstIncludeName)(featureExplorerPath, env);
                if (dirent !== undefined) {
                    if (dirent.isDirectory()) {
                        const featureName = feature.name;
                        const featureInstance = (0, tools_1.walk)(tree.tree, instanceTreePath);
                        featureInstance[featureName] = { "$className": "Folder", "$path": featureExplorerPath };
                        (0, logger_1.info)(`'${chalk_1.default.bold.rgb(21, 71, 94)(featureName)}.${chalk_1.default.rgb(180, 180, 180)(env)}' → ${chalk_1.default.rgb(0, 96, 223)("'" + instanceTreePath.join("/") + "'")}`);
                    }
                    else
                        (0, logger_1.warn)(`Found a ${chalk_1.default.bold("non-directory")} environment '${chalk_1.default.bold.yellowBright(env)}' entry `);
                }
            }
        }
        else
            (0, logger_1.warn)(`Found a ${chalk_1.default.bold("non-directory")} entry in the features folder ${chalk_1.default.gray("(" + featuresExplorerPath + ")")}: ${chalk_1.default.bold.rgb(255, 187, 0)("'" + feature.name + "'")}`);
    }
    try {
        (0, node_fs_1.writeFileSync)(config.projectFileName, JSON.stringify(tree, undefined, config.outputTabWidth));
        (0, logger_1.success)(`Generated feature tree: ${chalk_1.default.rgb(50, 255, 0)("'" + config.projectFileName + "'")}`);
    }
    catch (err) {
        if (err instanceof Error) {
            (0, logger_1.error)(`Failed to create project.json '${config.projectFileName}' file:`, err.message);
        }
    }
}
