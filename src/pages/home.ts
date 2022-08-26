import { element, setInnerHtml, TRUE } from "../deps.ts";
import { assign, defineFunc, execFunc, prop, statements } from "../deps.ts";
import { globalVariables as v, htmlTagNames as t } from "../variables.ts";

export function defineHomePage() {
  return defineFunc(
    v.goToHomePage,
    {
      body: statements(
        setInnerHtml(
          v.pageElement,
          [
            element(t.bigTitle, {
              children: "💀 Reaping Time ⏱",
              closed: true,
            }),
            element(t.button, {
              tagProps: { onclick: execFunc(v.goToLevelsPage) },
              closed: true,
              children: "Play",
            }),
            element(t.button, {
              tagProps: { onclick: execFunc(v.goToGamePage, TRUE) },
              closed: true,
              children: "Editor",
            }),
          ],
        ),
        assign(prop(v.headerTitle, "innerText"), "''"),
      ),
    },
  );
}
