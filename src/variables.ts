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
  // Factorized Functions
  canvasRenderLoop: "r",
  // Computed Values
  canvasWidth: "w",
  canvasHeight: "h",
  isPortraitOrientation: "p",
  isEditor: "d",
  // Re-assignable Variables
  event: "e",
  index1: "i",
  index2: "j",
  index3: "k",
  x: "x",
  y: "y",
  function: "$",
  variable: "_",
} as const;

export const htmlTagNames = {
  header: "h1",
  button: "a",
  page: "b",
  flexWithoutStyle: "z",
  interactive: "v",
  bigTitle: "t",
} as const;
