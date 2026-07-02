import { Command } from "commander";
import { work } from "./commands/work";

const program = new Command().name("feature-tree-generator").description("Roblox rojo Feature-oriented structure tree generator").version("1.0.0"); 
program.command("work").action(work).description("Generate project.json tree"); program.parse(process.argv)