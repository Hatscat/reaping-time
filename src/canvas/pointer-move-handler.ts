import {
  assign,
  defineFunc,
  execFunc,
  prop,
  statements,
  Text,
} from "../deps.ts";
import { globalVariables as v } from "../variables.ts";

export function defineCanvasPointerMoveHandler() {
  return defineFunc(v.canvasPointerMoveHandler, {
    args: [v.event],
    body: statements(
      assign(v.pointerX, prop(v.event, "offsetX")),
      assign(v.pointerY, prop(v.event, "offsetY")),
      // execFunc( "console.log", [Text(">> event"), v.event]),
    ),
  });
}
