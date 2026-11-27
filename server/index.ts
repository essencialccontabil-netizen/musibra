import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { app } from "./app.js";

const port = Number(process.env.PORT ?? 8787);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, "../dist");
const distRoot = path.relative(process.cwd(), distDir) || "dist";

if (fs.existsSync(distDir)) {
  app.use("/*", serveStatic({ root: distRoot }));
  app.notFound(async (c) => {
    if (c.req.path.startsWith("/api/")) {
      return c.json({ error: "Não encontrado" }, 404);
    }
    const index = path.join(distDir, "index.html");
    if (!fs.existsSync(index)) {
      return c.text("Build missing. Run npm run build.", 500);
    }
    return c.html(fs.readFileSync(index, "utf8"));
  });
}

serve({ fetch: app.fetch, port, hostname: "127.0.0.1" }, (info) => {
  console.log(`MUSIBRAS API+web on http://127.0.0.1:${info.port}`);
});
