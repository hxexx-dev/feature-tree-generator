"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const work_1 = require("./commands/work");
const program = new commander_1.Command().name("feature-tree-generator").description("Roblox rojo Feature-oriented structure tree generator").version("1.0.0");
program.command("work").action(work_1.work).description("Generate project.json tree");
program.parse(process.argv);
