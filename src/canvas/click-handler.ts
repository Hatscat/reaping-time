import { defineFunc, execFunc, prop, statements } from "../deps.ts";
import { globalVariables as v } from "../variables.ts";

export function defineCanvasClickHandler() {
  return defineFunc(v.canvasClickHandler, {
    body: statements(
      // TODO: handle inputs
      execFunc(
        "console.log",
        `"x:",${v.pointerX},", y:",${v.pointerY},", cell:",${v.hoveredCell}`,
      ),
    ),
  });
}
