import { config } from "../config.ts";
import {
  element,
  expressions,
  ifElse,
  isLower,
  setInnerHtml,
} from "../deps.ts";
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
  return expressions(
    assign(
      v.isPortraitOrientation,
      isLower("innerWidth", config.canvasMaxWidth),
    ),
    assign(
      v.canvasWidth,
      prop(v.canvasElement, "width"),
      ifElse(
        v.isPortraitOrientation,
        config.colCount * config.cellWidth,
        config.canvasMaxWidth,
      ),
    ),
    assign(
      v.canvasHeight,
      prop(v.canvasElement, "height"),
      ifElse(
        v.isPortraitOrientation,
        config.canvasMaxWidth,
        config.rowCount * config.cellWidth,
      ),
    ),
    assign(
      v.canvasContext,
      execFunc(prop(v.canvasElement, "getContext"), "2d", true),
    ),
  );
}
