declare module "@tanstack/react-start/server-entry" {
  const handler: {
    fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
  };
  export default handler;
}
