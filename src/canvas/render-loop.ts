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
  List,
  loop,
  mod,
  mul,
  not,
  or,
  prop,
  scope,
  statements,
  sub,
  Text,
} from "../deps.ts";
import { globalVariables as v } from "../variables.ts";

export function defineCanvasRenderLoop() {
  const timeArg = v.arg;

  return defineFunc(v.canvasRenderLoop, {
    args: [timeArg],
    body: statements(
      execFunc("requestAnimationFrame", v.canvasRenderLoop),
      abortIf(not(prop("window", v.canvasContext))),
      drawBackground(),
      ifThen(
        v.editorState,
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
  const cellsCount = config.gridSideCellCount ** 2;
  return loop({
    init: [
      assign(v.index1, cellsCount),
    ],
    condition: decrement(v.index1),
    body: execFunc(prop(v.canvasContext, "strokeRect"), [
      mul(mod(v.index1, config.gridSideCellCount), config.cellWidth),
      mul(
        scope("(", castInt(div(v.index1, config.gridSideCellCount))),
        config.cellWidth,
      ),
      config.cellWidth,
      config.cellWidth,
    ]),
  });
}

function drawPalette(): string {
  const position = [
    (config.gridSideCellCount + 1) * config.cellWidth,
    1 * config.cellWidth,
  ];
  const roundHalf = (n: number) => n + 0.5 >> 1;

  return statements(
    assign(
      prop(v.canvasContext, "font"),
      `'${roundHalf(config.cellWidth)}px A'`,
    ),
    loop({
      init: assign(v.index1, 6),
      condition: decrement(v.index1),
      body: [
        assign(
          v.x,
          add(
            position[0],
            mul(v.index1, config.cellWidth),
          ),
        ),
        assign(
          prop(v.canvasContext, "fillStyle"),
          or(
            dynamicProp(
              List(
                Text("#117"),
                Text("#171"),
                Text("#711"),
              ),
              v.index1,
            ),
            Text("#111"),
          ),
        ),
      ],
      body2: [
        execFunc(prop(v.canvasContext, "fillRect"), [
          v.x,
          position[1],
          config.cellWidth,
          config.cellWidth,
        ]),
        ifElse(
          isGreater(v.index1, 2),
          execFunc(prop(v.canvasContext, "fillText"), [
            dynamicProp(
              List(
                Text("💀"),
                Text("🧍"),
                Text("❌"),
              ),
              sub(v.index1, 3),
            ),
            add(v.x, roundHalf(config.cellWidth)),
            position[1] + roundHalf(config.cellWidth),
          ]),
          0,
        ),
        execFunc(prop(v.canvasContext, "strokeRect"), [
          v.x,
          position[1],
          config.cellWidth,
          config.cellWidth,
        ]),
      ],
    }),
  );
}
