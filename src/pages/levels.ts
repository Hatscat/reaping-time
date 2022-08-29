import { element, setInnerHtml, Text } from "../deps.ts";
import { assign, defineFunc, execFunc, prop, statements } from "../deps.ts";
import { globalVariables as v, htmlTagNames as t } from "../variables.ts";

export function defineLevelsPage() {
  return defineFunc(
    v.goToLevelsPage,
    {
      body: statements(
        setInnerHtml(v.pageElement, [
          element(t.button, {
            tagProps: { onclick: execFunc(v.goToGamePage) },
            closed: true,
            children: "Level x",
          }),
        ]),
        assign(prop(v.headerTitle, "innerText"), Text("Levels")),
      ),
    },
  );
}
