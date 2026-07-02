import chalk from "chalk";

const TOOL_NAME = chalk.rgb(200, 200, 200)("FeatureTreeGenerator")
const dark = (text: string) => chalk.bold.rgb(125, 125, 125)(text)

function prefix(level: string): string { return `${dark("[")}${TOOL_NAME}${dark(":")}${level}${dark("]:")}` }

export function error(...data: any[]): never { console.error(prefix(chalk.bgRgb(151, 0, 0).bold.rgb(255, 255, 255)("ERROR💥")), ...data); process.exit(1) }
export function warn(...data: any[]): void { console.log(prefix(chalk.bold.rgb(255, 217, 0)("WARN🟡")), ...data) }
export function info(...data: any[]): void { console.log(prefix(chalk.bold.rgb(0, 110, 255)("INFO📘")), ...data) }
export function success(...data: any[]): void { console.log(prefix(chalk.bold.rgb(0, 255, 13)("SUCCESS✅")), ...data) }