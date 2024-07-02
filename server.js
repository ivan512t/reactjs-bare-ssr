import render from "preact-render-to-string";
import { serveDir } from "jsr:@std/http/file-server";
import { App } from "./public/app.js";

Deno.serve(async (request) => {
    let pathname = new URL(request.url).pathname;

    if (pathname.startsWith("/static")) {
        return serveDir(request, {
            fsRoot: "public",
            urlRoot: "static",
        });
    }

    if (pathname.startsWith("/")) {
        let htmlF = await Deno.readFile("./public/index.html");
        let html = new TextDecoder().decode(htmlF);
        let appHtml = render(App);
        let body = new TextEncoder().encode(
            html.replace("<!--ssr-outlent-->", appHtml),
        );
        return new Response(body, {
            headers: new Headers({ "Content-Type": `text/html` }),
        });
    }

    return new Response("404: Not Found", {
        status: 404,
    });
});
