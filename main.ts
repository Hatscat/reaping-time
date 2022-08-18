import { getGameHtmlSrc } from "./src/index.ts";

const src = getGameHtmlSrc();

await Deno.mkdir("dist", { recursive: true });

Deno.writeTextFile("dist/index.html", src, { create: true });
