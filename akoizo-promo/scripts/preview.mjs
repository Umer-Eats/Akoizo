import { build } from "esbuild";
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
const root = path.resolve(import.meta.dirname, "..");
await build({
  entryPoints: [path.join(root, "src/Player.tsx")],
  outfile: path.join(root, "output/player.js"),
  bundle: true,
  platform: "browser",
  define: { "process.env.NODE_ENV": '"production"' },
});
const types = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".wav": "audio/wav",
  ".woff2": "font/woff2",
};
http
  .createServer((req, res) => {
    const url = decodeURIComponent((req.url || "/").split("?")[0]);
    const rel =
      url === "/"
        ? "preview.html"
        : url === "/player.js"
          ? "output/player.js"
          : url.replace(/^\//, "");
    const isAsset = !rel.includes('/') && ['.png','.svg','.wav','.woff2'].includes(path.extname(rel));
    const file = path.resolve(root, isAsset ? path.join('public',rel) : rel);
    if (!file.startsWith(root + path.sep)) {
      res.writeHead(403);
      res.end();
      return;
    }
    fs.stat(file, (err, stat) => {
      if (err || !stat.isFile()) {
        res.writeHead(404);
        res.end();
        return;
      }
      res.writeHead(200, {
        "Content-Type": types[path.extname(file)] || "application/octet-stream",
        "Content-Length": stat.size,
      });
      fs.createReadStream(file).pipe(res);
    });
  })
  .listen(3101, "127.0.0.1", () =>
    console.log("Interactive portrait preview: http://127.0.0.1:3101"),
  );
