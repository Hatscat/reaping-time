import { element } from "../deps.ts";
import { execFunc } from "../deps.ts";
import { globalVariables as v, htmlTagNames as t } from "../variables.ts";

export function headerElement(): string {
  return element(t.header, {
    children: [
      element(t.interactive, {
        children: "💀⏱",
        tagProps: {
          onclick: execFunc(v.goToHomePage),
        },
        closed: true,
      }),
      element(t.flexWithoutStyle, {
        tagProps: { id: v.headerTitle },
        closed: true,
      }),
      element(t.interactive, {
        children: "👤",
        tagProps: {
          onclick: execFunc(v.goToUserPage),
        },
      }),
    ],
    closed: true,
  });
}
