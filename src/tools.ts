import * as fs from "node:fs";
import z from "zod";
import { error } from "./logger";

export function findFirstIncludeName(dir: string, name: string): fs.Dirent | undefined { for (const dirent of fs.readdirSync(dir, { withFileTypes: true })) { if (dirent.name.includes(name)) return dirent } }

export function walk(object: Record<string, unknown>, path: string[]): Record<string, unknown> {
      let current = object
      for (const property of path) {
            const found = current[property]
            if (found === undefined || found === null || typeof found !== "object") { 
                  const directory = { "$className": "Folder" }; current[property] = directory;current = directory } else { current = found as Record<string, unknown> }
      }
      return current
}

export function parseJSON<S extends z.ZodType>(name: string, schema: S): z.infer<S> {
      let file 
      
      try { file = fs.readFileSync(name, "utf8") } catch (err) { 
            const errorMessage = err instanceof Error ? err.message : String(err); error(`Failed to read JSON ('${name}'):\n${errorMessage}`) 
      }

      const result = schema.safeParse(JSON.parse(file))
      if (!result.success) { error(`Failed to parse schema ('${name}'): ${z.prettifyError(result.error)}`) } else return result.data
}