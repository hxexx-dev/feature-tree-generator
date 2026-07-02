# FeatureTreeGenerator

A CLI tool for generating Rojo `project.json` files for feature-based Roblox projects:

```
features/
  inventory/
    server/
      inventory_service.luau
    client/
      ui.luau
```

This structure separates server and client code by feature.

## Setup

Create `gentree.config.json`:

```json
{
  "baseTreePath": "base.json",
  "outputTabWidth": 4,
  "projectFileName": "game.project.json",
  "featuresExplorerPath": "src/features",
  "environments": {
    "server": ["ServerScriptService", "Server", "features"],
    "client": ["StarterPlayer", "StarterPlayerScripts", "features"],
    "shared": ["ReplicatedStorage", "Shared", "features"]
  }
}
```

Example base.json:
```json
  "name": "rpg",
  "tree": {
    "$className": "DataModel",
    "ReplicatedStorage": {
      "features": { "$className": "Folder" }
    },
    "ServerScriptService": {
      "features": { "$className": "Folder" }
    },
    "StarterPlayer": {
      "StarterPlayerScripts": {
        "features": { "$className": "Folder" }
      }
    }
  }
}
```

Now in the root folder of project, run:
```
node path/to/index.js work
```