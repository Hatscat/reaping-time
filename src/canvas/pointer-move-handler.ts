import { config } from "../config.ts";
import {
  add,
  assign,
  castInt,
  defineFunc,
  div,
  execFunc,
  mul,
  prop,
  scope,
  statements,
} from "../deps.ts";
import { globalVariables as v } from "../variables.ts";

export function defineCanvasPointerMoveHandler() {
  const innerFunctionArg = v.index1;
  return defineFunc(v.canvasPointerMoveHandler, {
    args: [v.arg],
    body: statements(
      assign(v.pointerX, prop(v.arg, "offsetX")),
      assign(v.pointerY, prop(v.arg, "offsetY")),
      defineFunc(v.function, {
        args: [innerFunctionArg],
        body: castInt(
          add(
            div(v.pointerX, config.cellWidth),
            mul(
              scope(
                "(",
                castInt(div(v.pointerY, config.cellWidth)),
              ),
              innerFunctionArg,
            ),
          ),
        ),
        safe: false,
      }),
      assign(
        v.hoveredLandscapeCanvasCell,
        execFunc(v.function, config.canvasLengthCellCount),
      ),
      assign(
        v.hoveredGridCell,
        execFunc(v.function, config.gridSideCellCount),
      ),
    ),
  });
}
