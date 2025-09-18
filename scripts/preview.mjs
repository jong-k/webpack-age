import { spawn } from "node:child_process";
import fs from "node:fs";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const PORT = 12346;
const BASE_URL = `http://localhost:${PORT}`;
const CONTENT_TYPES = new Map([
  [".html", "text/html; charset=utf-8"],
  [".js", "application/javascript; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".map", "application/json; charset=utf-8"],
  [".txt", "text/plain; charset=utf-8"],
  [".svg", "image/svg+xml"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".webp", "image/webp"],
  [".ico", "image/x-icon"],
  [".woff", "font/woff"],
  [".woff2", "font/woff2"],
  [".ttf", "font/ttf"],
  [".otf", "font/otf"],
]);

const dirName = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.resolve(dirName, "..", "dist");
const indexHtmlPath = path.join(distPath, "index.html");

const args = new Set(process.argv.slice(2));
const shouldOpen = args.has("--open") || args.has("-o");

if (!fs.existsSync(indexHtmlPath)) {
  console.error("[preview] dist/index.html not found. Run `pnpm build` first.");
  process.exit(1);
}

function sendFile(res, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const ctype = CONTENT_TYPES.get(ext) || "application/octet-stream";
  const stat = fs.statSync(filePath);
  res.writeHead(200, {
    "Content-Type": ctype,
    "Content-Length": stat.size,
    "Cache-Control": "no-cache",
  });
  fs.createReadStream(filePath).pipe(res);
}

function serveFallback(res) {
  try {
    sendFile(res, indexHtmlPath);
  } catch (err) {
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("500 - Internal Server Error\n" + (err && err.message ? err.message : ""));
  }
}

const server = createServer((req, res) => {
  try {
    const url = new URL(req.url, BASE_URL);
    const reqPath = decodeURIComponent(url.pathname);

    // Normalize and resolve within root
    const unsafeFsPath = path.normalize(reqPath).replace(/^\/+/, "");
    let fsPath = path.join(distPath, unsafeFsPath);

    // If requesting root, serve index.html
    if (reqPath === "/") return sendFile(res, indexHtmlPath);

    // If path ends with '/', append index.html (for sub-folder index)
    if (reqPath.endsWith("/")) fsPath = path.join(fsPath, "index.html");

    // Block path traversal outside root
    const resolved = path.resolve(fsPath);
    if (!resolved.startsWith(distPath)) {
      res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
      return res.end("403 - Forbidden");
    }

    if (fs.existsSync(resolved) && fs.statSync(resolved).isFile()) return sendFile(res, resolved);

    // SPA fallback for non-file routes
    // Heuristic: if no extension or 404 on asset, return index.html
    const hasExt = path.extname(reqPath) !== "";
    if (!hasExt) return serveFallback(res);

    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    return res.end("404 - Not Found");
  } catch (err) {
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("500 - Internal Server Error\n" + (err && err.message ? err.message : ""));
  }
});

server.listen(PORT, () => {
  console.log(`[preview] Serving dist at ${BASE_URL}`);
  if (shouldOpen) {
    const platform = process.platform;
    const opener = platform === "darwin" ? "open" : platform === "win32" ? "cmd" : "xdg-open";
    const args = platform === "win32" ? ["/c", "start", BASE_URL] : [BASE_URL];
    try {
      spawn(opener, args, { stdio: "ignore", detached: true }).unref();
    } catch (err) {
      // Non-fatal: just log
      console.warn(`[preview] Failed to open browser automatically: ${err?.message ?? err}`);
    }
  }
});

server.on("error", err => {
  console.error(`[preview] Server error: ${err.message}`);
  process.exit(1);
});
