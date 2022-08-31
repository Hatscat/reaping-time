import { config } from "../config.ts";
import {
  element,
  expressions,
  ifElse,
  isLower,
  setInnerHtml,
  Text,
} from "../deps.ts";
import { assign, defineFunc, execFunc, prop, statements } from "../deps.ts";
import { globalVariables as v } from "../variables.ts";

export function defineGamePage() {
  const editorState = v.arg;
  return defineFunc(
    v.goToGamePage,
    {
      args: [editorState],
      body: statements(
        assign(v.editorState, editorState),
        setInnerHtml(v.pageElement, [
          element("canvas", {
            tagProps: {
              id: v.canvasElement,
              onclick: execFunc(v.canvasClickHandler, "event"),
              onpointermove: execFunc(v.canvasPointerMoveHandler, "event"),
            },
          }),
        ]),
        assign(
          prop(v.headerTitle, "innerText"),
          ifElse(v.editorState, Text("Editor"), Text("level X")),
        ),
        canvasSetup(),
      ),
    },
  );
}

function canvasSetup() {
  const maxWidth = config.canvasLengthCellCount * config.cellWidth;

  return expressions(
    assign(
      v.isPortraitOrientation,
      isLower("innerWidth", maxWidth),
    ),
    assign(
      v.canvasWidth,
      prop(v.canvasElement, "width"),
      ifElse(
        v.isPortraitOrientation,
        config.gridSideCellCount * config.cellWidth,
        maxWidth,
      ),
    ),
    assign(
      v.canvasHeight,
      prop(v.canvasElement, "height"),
      ifElse(
        v.isPortraitOrientation,
        maxWidth,
        config.gridSideCellCount * config.cellWidth,
      ),
    ),
    assign(
      v.canvasContext,
      execFunc(prop(v.canvasElement, "getContext"), "2d", true),
    ),
    assign(prop(v.canvasContext, "textAlign"), Text("center")),
    assign(prop(v.canvasContext, "textBaseline"), Text("middle")),
  );
}
