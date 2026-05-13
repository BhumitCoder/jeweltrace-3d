import { copyFileSync, cpSync, mkdirSync, writeFileSync, rmSync } from "fs";
import { join } from "path";

const root = process.cwd();
const out = join(root, ".vercel", "output");

// Clean and create output structure
rmSync(out, { recursive: true, force: true });
mkdirSync(join(out, "static"), { recursive: true });
mkdirSync(join(out, "functions", "index.func"), { recursive: true });

// Copy static client assets
cpSync(join(root, "dist", "client"), join(out, "static"), { recursive: true });

// Copy server bundle into the function directory
cpSync(join(root, "dist", "server"), join(out, "functions", "index.func"), { recursive: true });

// Write the Vercel serverless function entry that wraps the Cloudflare Worker handler
writeFileSync(
  join(out, "functions", "index.func", "vercel-entry.js"),
  `import handler from "./index.js";

export default async function vercelHandler(req, res) {
  const url = new URL(req.url, \`https://\${req.headers.host}\`);
  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (value !== undefined) {
      if (Array.isArray(value)) {
        value.forEach((v) => headers.append(key, v));
      } else {
        headers.set(key, value);
      }
    }
  }

  const hasBody = req.method !== "GET" && req.method !== "HEAD";
  const body = hasBody
    ? await new Promise((resolve) => {
        const chunks = [];
        req.on("data", (chunk) => chunks.push(chunk));
        req.on("end", () => resolve(Buffer.concat(chunks)));
      })
    : undefined;

  const request = new Request(url.toString(), {
    method: req.method,
    headers,
    body,
  });

  const response = await handler.fetch(request, {}, {
    waitUntil: () => {},
    passThroughOnException: () => {},
  });

  res.statusCode = response.status;
  response.headers.forEach((value, key) => {
    res.setHeader(key, value);
  });

  const buffer = await response.arrayBuffer();
  res.end(Buffer.from(buffer));
}
`
);

// Write the Vercel function config
writeFileSync(
  join(out, "functions", "index.func", ".vc-config.json"),
  JSON.stringify({
    runtime: "nodejs20.x",
    handler: "vercel-entry.js",
    launcherType: "Nodejs",
    shouldAddHelpers: true,
  }, null, 2)
);

// Write the Vercel output config with routes
writeFileSync(
  join(out, "config.json"),
  JSON.stringify({
    version: 3,
    routes: [
      // Serve static assets directly
      {
        src: "^/assets/(.*)$",
        headers: { "cache-control": "public, max-age=31536000, immutable" },
        continue: true,
      },
      {
        handle: "filesystem",
      },
      // Everything else goes to the SSR function
      {
        src: "/(.*)",
        dest: "/index",
      },
    ],
  }, null, 2)
);

console.log("✓ Vercel output structure created at .vercel/output/");
