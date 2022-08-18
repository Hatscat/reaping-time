import { config } from "../config.ts";
import {
  abortIf,
  add,
  assign,
  band,
  castInt,
  decrement,
  defineFunc,
  div,
  execFunc,
  increment,
  isLower,
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

  return defineFunc(v.canvasRenderLoop, {
    args: [v.time],
    body: statements(
      execFunc("requestAnimationFrame", v.canvasRenderLoop),
      abortIf(not(prop("window", v.canvasContext))),
      // assign(prop(v.canvasContext, "fillStyle"), "'#111'"),
      assign(prop(v.canvasContext, "fillStyle"), "'#fff'"),
      execFunc(prop(v.canvasContext, "fillRect"), [
        0,
        0,
        v.canvasWidth,
        v.canvasHeight,
      ]),
      // 1D loop
      loop({
        init: assign(v.index1, cellCount),
        condition: decrement(v.index1),
        body: scope(
          "{",
          statements(
            assign(v.x, mod(v.index1, config.colCount)),
            assign(v.y, castInt(div(v.index1, config.colCount))),
            assign(
              prop(v.canvasContext, "fillStyle"),
              add(
                "'#'",
                prop(
                  prop(
                    scope(
                      "(",
                      band(
                        add(
                          mul(v.time, ".001"),
                          mul(v.x, 2),
                          mul(v.y, 3),
                        ),
                        0xFFF,
                      ),
                    ),
                    execFunc("toString", 36),
                  ),
                  execFunc("padEnd", [3, 0]),
                ),
              ),
            ),
          ),
        ),
        body2: [
          execFunc(prop(v.canvasContext, "fillRect"), [
            mul(v.x, config.cellWidth),
            mul(v.y, config.cellWidth),
            config.cellWidth,
            config.cellWidth,
          ]),
          execFunc(prop(v.canvasContext, "strokeRect"), [
            mul(v.x, config.cellWidth),
            mul(v.y, config.cellWidth),
            config.cellWidth,
            config.cellWidth,
          ]),
        ],
      }),
      // // is better?

      // 2D loop
      // loop({
      //   init: assign(v.index1, config.rowCount),
      //   condition: decrement(v.index1),
      //   body: loop({
      //     init: assign(v.index2, config.colCount),
      //     condition: decrement(v.index2),
      //     body: assign(
      //       prop(v.canvasContext, "fillStyle"),
      //       add(
      //         "'#'",
      //         prop(
      //           prop(
      //             scope(
      //               "(",
      //               band(
      //                 add(
      //                   mul(v.time, ".001"),
      //                   mul(v.index1, 2),
      //                   mul(v.index2, 3),
      //                 ),
      //                 0xFFF,
      //               ),
      //             ),
      //             execFunc("toString", 36),
      //           ),
      //           execFunc("padEnd", [3, 0]),
      //         ),
      //       ),
      //     ),
      //     body2: execFunc(prop(v.canvasContext, "fillRect"), [
      //       mul(v.index2, config.cellWidth),
      //       mul(v.index1, config.cellWidth),
      //       config.cellWidth,
      //       config.cellWidth,
      //     ]),
      //   }),
      // }),
    ),
  });
}
