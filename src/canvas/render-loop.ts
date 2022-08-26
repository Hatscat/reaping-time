import { config } from "../config.ts";
import {
  abortIf,
  add,
  assign,
  castInt,
  decrement,
  defineFunc,
  div,
  dynamicProp,
  execFunc,
  ifElse,
  ifThen,
  isDifferent,
  isGreater,
  loop,
  mod,
  mul,
  not,
  prop,
  scope,
  statements,
  stringify,
} from "../deps.ts";
import { globalVariables as v } from "../variables.ts";

export function defineCanvasRenderLoop() {
  const timeArg = "e";

  return defineFunc(v.canvasRenderLoop, {
    args: [timeArg],
    body: statements(
      execFunc("requestAnimationFrame", v.canvasRenderLoop),
      abortIf(not(prop("window", v.canvasContext))),
      drawBackground(),
      ifThen(
        v.isEditor,
        scope(
          "{",
          statements(
            assign(prop(v.canvasContext, "strokeStyle"), stringify("#fff")),
            drawGrid(),
            drawPalette(),
          ),
        ),
      ),
    ),
  });
}

function drawBackground(): string {
  return statements(
    assign(prop(v.canvasContext, "fillStyle"), stringify("#111")),
    execFunc(prop(v.canvasContext, "fillRect"), [
      0,
      0,
      v.canvasWidth,
      v.canvasHeight,
    ]),
  );
}

function drawGrid(): string {
  const cellCount = config.rowCount * config.colCount;
  return loop({
    init: [
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
  });
}

function drawPalette(): string {
  const gridWidth = config.colCount * config.cellWidth;
  return statements(
    assign(
      prop(v.canvasContext, "font"),
      `'${config.paletteCellWidth >> 1}px A'`,
    ),
    loop({
      init: assign(v.index1, 5),
      condition: decrement(v.index1),
      body: [
        assign(
          v.x,
          add(
            gridWidth + config.paletteOffset,
            mul(v.index1, config.paletteCellWidth),
          ),
        ),
        assign(
          prop(v.canvasContext, "fillStyle"),
          dynamicProp(
            scope("[", [
              stringify("#117"),
              stringify("#171"),
              stringify("#711"),
              stringify("#000"),
              stringify("#000"),
            ]),
            v.index1,
          ),
        ),
      ],
      body2: [
        execFunc(prop(v.canvasContext, "fillRect"), [
          v.x,
          config.paletteOffset,
          config.paletteCellWidth,
          config.paletteCellWidth,
        ]),
        ifElse(
          isGreater(v.index1, 2),
          execFunc(prop(v.canvasContext, "fillText"), [
            ifElse(isDifferent(v.index1, 3), stringify("💀"), stringify("🧍")),
            add(v.x, config.paletteCellWidth / 2),
            config.paletteOffset + config.paletteCellWidth / 2,
          ]),
          0,
        ),
        execFunc(prop(v.canvasContext, "strokeRect"), [
          v.x,
          config.paletteOffset,
          config.paletteCellWidth,
          config.paletteCellWidth,
        ]),
      ],
    }),
  );
}
