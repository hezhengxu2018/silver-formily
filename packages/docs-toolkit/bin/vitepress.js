#!/usr/bin/env node
import { createRequire } from "node:module"
import { spawn } from "node:child_process"
import path from "node:path"

const require = createRequire(import.meta.url)
const pkgPath = require.resolve("vitepress/package.json")
const cliPath = path.join(path.dirname(pkgPath), "bin", "vitepress.js")

const child = spawn(process.execPath, [cliPath, ...process.argv.slice(2)], {
  stdio: "inherit",
})

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal)
    return
  }
  process.exit(code ?? 0)
})
