import { join } from "node:path"
import { findFirstIncludeName, parseJSON, walk } from "../tools"
import { readdirSync, writeFileSync } from "node:fs"
import { getConfig } from "../config"
import { error, info, success, warn } from "../logger"
import chalk from "chalk"
import { BASETREE_SCHEMA } from "../baseTree"

export function work(): void {
      const config = getConfig()
      const featuresExplorerPath = config.featuresExplorerPath
      const tree = structuredClone(parseJSON(config.baseTreePath, BASETREE_SCHEMA))

      for (const feature of readdirSync(featuresExplorerPath, { withFileTypes: true })) {
            const featureExplorerPath = join(featuresExplorerPath, feature.name)
            if (feature.isDirectory()) {
                  for (const [env, instanceTreePath] of Object.entries(config.environments)) {
                        const dirent = findFirstIncludeName(featureExplorerPath, env)
                        if (dirent !== undefined) {
                              if (dirent.isDirectory()) {
                                    const featureName = feature.name
                                    const featureInstance = walk(tree.tree, instanceTreePath)
                                    featureInstance[featureName] = { "$className": "Folder", "$path": featureExplorerPath }
                                    info(`'${chalk.bold.rgb(21, 71, 94)(featureName)}.${chalk.rgb(180, 180, 180)(env)}' → ${chalk.rgb(0, 96, 223)("'"+instanceTreePath.join("/")+"'")}`)
                              } else warn(`Found a ${chalk.bold("non-directory")} environment '${chalk.bold.yellowBright(env)}' entry `)
                        }
                  }
            } else warn(`Found a ${chalk.bold("non-directory")} entry in the features folder ${chalk.gray("("+featuresExplorerPath+")")}: ${chalk.bold.rgb(255, 187, 0)("'"+feature.name+"'")}`)
      }

      try {
            writeFileSync(config.projectFileName, JSON.stringify(tree, undefined, config.outputTabWidth)); 
            success(`Generated feature tree: ${chalk.rgb(50, 255, 0)("'"+config.projectFileName+"'")}`)
      } catch (err) { if (err instanceof Error) { error(`Failed to create project.json '${config.projectFileName}' file:`, err.message) } }
}