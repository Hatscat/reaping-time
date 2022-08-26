import { config } from "../config.ts";
import {
  abortIf,
  assign,
  castInt,
  decrement,
  defineFunc,
  div,
  execFunc,
  ifThen,
  loop,
  mod,
  mul,
  not,
  prop,
  scope,
  statements,
} from "../deps.ts";
import { globalVariables as v } from "../variables.ts";

export function defineCanvasRenderLoop() {
  const cellCount = config.rowCount * config.colCount;
  const timeArg = "e";

  return defineFunc(v.canvasRenderLoop, {
    args: [timeArg],
    body: statements(
      execFunc("requestAnimationFrame", v.canvasRenderLoop),
      abortIf(not(prop("window", v.canvasContext))),
      ...drawBackground(),
      ifThen(
        v.isEditor,
        loop({
          init: [
            assign(prop(v.canvasContext, "strokeStyle"), "'#fff'"),
            assign(v.index1, cellCount),
          ],
          condition: decrement(v.index1),
          body: execFunc(prop(v.canvasContext, "strokeRect"), [
            mul(mod(v.index1, config.colCount), config.cellWidth),
            mul(
              scope("(", castInt(div(v.index1, config.colCount))),
              config.cellWidth,
            ),
            config.cellWidth,
            config.cellWidth,
          ]),
        }),
      ),
    ),
  });
}

function drawBackground(): string[] {
  return [
    assign(prop(v.canvasContext, "fillStyle"), "'#400'"),
    // assign(prop(v.canvasContext, "fillStyle"), "'#111'"),
    execFunc(prop(v.canvasContext, "fillRect"), [
      0,
      0,
      v.canvasWidth,
      v.canvasHeight,
    ]),
  ];
}
