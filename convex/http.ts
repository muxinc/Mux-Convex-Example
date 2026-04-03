import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { registerMuxHttpRoutes } from "./muxHttp";

const http = httpRouter();

registerMuxHttpRoutes(http);

http.route({
  path: "/sup",
  method: "GET",
  handler: httpAction(async () => {
    return new Response("Sup convex", { status: 200 });
  }),
});

export default http;
