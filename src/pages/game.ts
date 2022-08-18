import { config } from "../config.ts";
import { element, setInnerHtml } from "../deps.ts";
import { assign, defineFunc, execFunc, prop, statements } from "../deps.ts";
import { globalVariables as v } from "../variables.ts";

export function defineGamePage() {
  return defineFunc(
    v.goToGamePage,
    {
      args: [], // TODO: distinct editor from game level there
      body: statements(
        setInnerHtml(v.pageElement, [
          element("canvas", {
            tagProps: {
              id: v.canvasElement,
              onclick: execFunc(v.canvasClickHandler, "event"),
            },
          }),
        ]),
        assign(prop(v.headerTitle, "innerText"), "'Level x or Editor'"),
        canvasSetup(),
      ),
    },
  );
}

function canvasSetup() {
  return statements(
    assign(
      v.canvasWidth,
      prop(v.canvasElement, "width"),
      config.rowCount * config.cellWidth,
    ),
    assign(
      v.canvasHeight,
      prop(v.canvasElement, "height"),
      "innerHeight",
    ),
    assign(
      v.canvasContext,
      execFunc(prop(v.canvasElement, "getContext"), "2d", true),
    ),
  );
}
