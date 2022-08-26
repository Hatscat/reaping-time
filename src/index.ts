import { element, formatStylesheet, scope, TRUE } from "./deps.ts";
import { execFunc, statements } from "./deps.ts";
import { defineCanvasClickHandler } from "./canvas/click-handler.ts";
import { defineCanvasRenderLoop } from "./canvas/render-loop.ts";
import { headerElement } from "./elements/header.ts";
import { defineGamePage } from "./pages/game.ts";
import { defineHomePage } from "./pages/home.ts";
import { globalVariables as v, htmlTagNames as t } from "./variables.ts";
import { defineLevelsPage } from "./pages/levels.ts";
import { defineUserPage } from "./pages/user.ts";

export function getGameHtmlSrc(): string {
  const headerHeight = 48;
  const css = formatStylesheet({
    "*": { margin: 0, color: "#ECF", fontFamily: "Arial" },
    "body": { background: "#111", overflow: "hidden" },
    [`${t.page} *,${t.header}`]: {
      display: "flex",
    },
    [t.header]: {
      background: "#222",
      justifyContent: "space-between",
      alignItems: "center",
      height: headerHeight,
      padding: "0 40",
    },
    [t.button]: {
      background: "#333",
      justifyContent: "center",
      fontSize: 24,
      width: 256,
      padding: "16 0",
      margin: 16,
      borderRadius: "8px",
      cursor: "pointer",
    },
    [`${t.button}:hover`]: {
      background: "#444",
    },
    [t.bigTitle]: {
      fontSize: 80,
      padding: 32,
    },
    [t.interactive]: {
      cursor: "pointer",
    },
    [`#${v.pageElement}`]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      // padding: 8,
    },
  });

  return [
    element("style", { children: css, closed: true }),
    headerElement(),
    element(t.page, { tagProps: { id: v.pageElement } }),
    element("script", { children: getScript(), closed: true }),
  ].join("");
}

function getScript() {
  return statements(
    defineHomePage(),
    defineLevelsPage(),
    defineUserPage(),
    defineGamePage(),
    defineCanvasClickHandler(),
    // execFunc(v.goToHomePage),
    execFunc(v.goToGamePage, TRUE),
    execFunc(scope("(", defineCanvasRenderLoop())),
  );
}
