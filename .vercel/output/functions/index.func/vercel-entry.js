import handler from "./index.js";

export default async function vercelHandler(req, res) {
  const url = new URL(req.url, `https://${req.headers.host}`);
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
