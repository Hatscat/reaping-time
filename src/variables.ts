import { provideTmpVarNames } from "./deps.ts";

export const globalVariables = provideTmpVarNames({
  // Elements
  pageElement: "",
  headerTitle: "",
  canvasElement: "",
  canvasContext: "",
  // Pages
  goToHomePage: "",
  goToLevelsPage: "",
  goToUserPage: "",
  goToGamePage: "",
  // Event Handlers
  canvasClickHandler: "",
  canvasPointerMoveHandler: "",
  // Factorized Functions
  canvasRenderLoop: "",
  // Computed Values
  canvasWidth: "",
  canvasHeight: "",
  isPortraitOrientation: "",
  editorState: "",
  pointerX: "",
  pointerY: "",
  hoveredLandscapeCanvasCell: "",
  hoveredGridCell: "",
  pickedItem: "",
  // Re-assignable Variables
  arg: "",
  index1: "",
  index2: "",
  index3: "",
  x: "",
  y: "",
  function: "",
});

export const htmlTagNames = {
  header: "h1",
  button: "a",
  page: "b",
  flexWithoutStyle: "z",
  interactive: "v",
  bigTitle: "t",
} as const;

export const enum EditorState {
  None = 0,
  Edition = 1,
  Validation = 2,
}
