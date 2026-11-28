import * as esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["server/index.ts"],
  bundle: true,
  platform: "node",
  format: "esm",
  outfile: "dist-server/index.js",
  packages: "external",
  logLevel: "info",
});

console.log("server bundle → dist-server/index.js");
