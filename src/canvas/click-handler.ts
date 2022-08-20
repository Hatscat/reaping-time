import { defineFunc, execFunc, prop, statements } from "../deps.ts";
import { globalVariables as v } from "../variables.ts";

export function defineCanvasClickHandler() {
  return defineFunc(v.canvasClickHandler, {
    args: [v.event],
    body: statements(
      // TODO: handle inputs
      execFunc(
        "console.log",
        `"x:",${prop(v.event, "clientX")},", y:",${prop(v.event, "clientY")}`,
      ),
    ),
  });
}
