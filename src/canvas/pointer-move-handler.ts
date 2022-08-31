import { config } from "../config.ts";
import {
  add,
  assign,
  castInt,
  defineFunc,
  div,
  execFunc,
  mod,
  mul,
  prop,
  scope,
  statements,
  Text,
} from "../deps.ts";
import { globalVariables as v } from "../variables.ts";

export function defineCanvasPointerMoveHandler() {
  return defineFunc(v.canvasPointerMoveHandler, {
    args: [v.arg],
    body: statements(
      assign(v.pointerX, prop(v.arg, "offsetX")),
      assign(v.pointerY, prop(v.arg, "offsetY")),
      assign(
        v.hoveredCell,
        castInt(
          add(
            div(v.pointerX, config.cellWidth),
            mul(
              scope(
                "(",
                castInt(div(v.pointerY, config.cellWidth)),
              ),
              config.gridSideCellCount,
            ),
          ),
        ),
      ),
    ),
  });
}
