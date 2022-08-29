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
  isGreater,
  isLower,
  List,
  loop,
  mod,
  mul,
  not,
  prop,
  scope,
  statements,
  Text,
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
            assign(prop(v.canvasContext, "strokeStyle"), Text("#fff")),
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
    assign(prop(v.canvasContext, "fillStyle"), Text("#111")),
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
  const position = [
    gridWidth + config.paletteOffset,
    config.paletteMargin + config.paletteOffset,
  ];
  const roundHalf = (n: number) => n + 0.5 >> 1;

  return statements(
    assign(
      prop(v.canvasContext, "font"),
      `'${roundHalf(config.paletteCellWidth)}px A'`,
    ),
    loop({
      init: assign(v.index1, 6),
      condition: decrement(v.index1),
      body: [
        assign(
          v.x,
          add(
            position[0],
            mul(v.index1, config.paletteCellWidth),
          ),
        ),
        assign(
          prop(v.canvasContext, "fillStyle"),
          dynamicProp(
            List(
              Text("#117"),
              Text("#171"),
              Text("#711"),
              Text("#000"),
              Text("#000"),
              Text("#111"),
            ),
            v.index1,
          ),
        ),
      ],
      body2: [
        execFunc(prop(v.canvasContext, "fillRect"), [
          v.x,
          position[1],
          config.paletteCellWidth,
          config.paletteCellWidth,
        ]),
        ifElse(
          isGreater(v.index1, 2),
          execFunc(prop(v.canvasContext, "fillText"), [
            ifElse(
              isLower(v.index1, 4),
              Text("💀"),
              ifElse(isLower(v.index1, 5), Text("🧍"), Text("❌")),
            ),
            add(v.x, roundHalf(config.paletteCellWidth)),
            position[1] + roundHalf(config.paletteCellWidth),
          ]),
          0,
        ),
        execFunc(prop(v.canvasContext, "strokeRect"), [
          v.x,
          position[1],
          config.paletteCellWidth,
          config.paletteCellWidth,
        ]),
      ],
    }),
  );
}
