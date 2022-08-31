export const globalVariables = {
  // Elements
  pageElement: "P",
  headerTitle: "T",
  canvasElement: "C",
  canvasContext: "X",
  // Pages
  goToHomePage: "H",
  goToLevelsPage: "L",
  goToUserPage: "U",
  goToGamePage: "G",
  // Event Handlers
  canvasClickHandler: "c",
  canvasPointerMoveHandler: "m",
  // Factorized Functions
  canvasRenderLoop: "r",
  // Computed Values
  canvasWidth: "w",
  canvasHeight: "h",
  isPortraitOrientation: "p",
  editorState: "s",
  pointerX: "u",
  pointerY: "v",
  hoveredCell: "o",
  pickedItem: "t",
  // Re-assignable Variables
  arg: "_",
  index1: "i",
  index2: "j",
  index3: "k",
  x: "x",
  y: "y",
  function: "$",
} as const;

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
