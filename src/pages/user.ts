import { element, setInnerHtml } from "../deps.ts";
import { assign, defineFunc, prop, statements } from "../deps.ts";
import { globalVariables as v, htmlTagNames as t } from "../variables.ts";

export function defineUserPage() {
  return defineFunc(
    v.goToUserPage,
    {
      body: statements(
        setInnerHtml(v.pageElement, [
          element(t.flexWithoutStyle, {
            children: "Your Creations",
            closed: true,
          }),
          element(t.flexWithoutStyle, {
            children: "Your Completed Levels",
            closed: true,
          }),
        ]),
        assign(prop(v.headerTitle, "innerText"), "'Pseudo'"),
      ),
    },
  );
}
