import z from "zod";
import { parseJSON } from "./tools";

const CONFIG_FILE_NAME = "gentree.config.json"
const CONFIG_SCHEMA = z.object({ 
      baseTreePath: z.string(),
      projectFileName: z.string(), outputTabWidth: z.int(), featuresExplorerPath: z.string(), environments: z.record(z.string(), z.array(z.string())) 
})

export type Config = z.infer<typeof CONFIG_SCHEMA>; export function getConfig(): Config { return parseJSON(CONFIG_FILE_NAME, CONFIG_SCHEMA) }