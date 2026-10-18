import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const cli = fileURLToPath(new URL("./node_modules/@slidev/cli/bin/slidev.mjs", import.meta.url));
const args = ["export", "slides.md", "--output", "slides.pdf"];
let browser = process.env.SLIDEV_BROWSER_PATH;
// Use the installed browser on Windows; other platforms use Playwright's default.
const edge = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
if (!browser && process.platform === "win32" && existsSync(edge)) browser = edge;
if (browser) args.push("--executable-path", browser);

const result = spawnSync(process.execPath, [cli, ...args], {
  cwd: fileURLToPath(new URL("./", import.meta.url)),
  stdio: "inherit",
});
if (result.error) throw result.error;
process.exit(result.status ?? 1);
