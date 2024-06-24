import { build } from "esbuild";

await Promise.all([
  build({
    entryPoints: ["src/db/dbScript.ts"],
    bundle: true,
    platform: "node",
    format: "esm",
    outdir: "dist/db",
    outExtension: { '.js': '.mjs' },
    banner: {
      js: `
        import __path from 'node:path';
        import { fileURLToPath as __fileURLToPath } from 'node:url';
        import { createRequire as __createRequire } from 'module';
        const require = __createRequire(import.meta.url);
        const __filename = __fileURLToPath(import.meta.url);
        const __dirname = __path.dirname(__filename);
      `,
    },
  }),
  build({
    entryPoints: ["src/db/migrations/*.ts"],
    bundle: true,
    platform: "node",
    format: "esm",
    outdir: "dist/db/migrations",
    outExtension: { '.js': '.mjs' },
    external: ['../dbScript'],
    plugins: [{
      name: 'add-js-suffix',
      setup(build) {
        build.onResolve({ filter: /.*/ }, (args) => {
          if (args.importer) {
            return { path: args.path + '.mjs', external: true }
          }
        })
      },
    }],
  }),
]);
