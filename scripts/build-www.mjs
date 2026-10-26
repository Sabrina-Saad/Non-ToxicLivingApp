// Copies the web app into www/, which Capacitor packages into the iOS and Android apps.
// The app has no build step of its own, so this is only a copy.
import { cpSync, rmSync, mkdirSync } from "node:fs";

const FILES = ["index.html", "manifest.webmanifest", "sw.js", "css", "js", "fonts", "icons"];

rmSync("www", { recursive: true, force: true });
mkdirSync("www");
for (const f of FILES) cpSync(f, `www/${f}`, { recursive: true });
console.log(`Copied ${FILES.join(", ")} to www/`);
