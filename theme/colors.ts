// export const colors = {
//   background: "#1a1b1b",
//   text: "#ffffff",
//   error: "crimson",
//   foreground: "#222223",
//   light_gray: "#868686",
//   button: "#bce084",
// };

// export const colors = {
//   background: "#fcfaf2",
//   text: "#000000",
//   error: "crimson",
//   foreground: "#fcfaf2",
//   light_gray: "#868686",
//   button: "#bce084",
// };

export interface Colors {
  background: string;
  text: string;
  error: string;
  foreground: string;
  light_gray: string;
  button: string;
  text_white: string;
  text_black: string;
  icon_color: string;
  green: string;
}

// themes.js
export const light: Colors = {
  background: "#f4f4f8",
  text: "#000000",
  error: "crimson",
  foreground: "#fffefe",
  light_gray: "#868686",
  button: "#007AFF",
  text_white: "#ffffff",
  text_black: "#000000",
  icon_color: "#868686",
  green: "green",
};

export const dark: Colors = {
  background: "#191818",
  text: "#dddddd",
  error: "crimson",
  foreground: "#222223",
  light_gray: "#868686",
  button: "#007AFF",
  text_white: "#ffffff",
  text_black: "#000000",
  icon_color: "#868686",
  green: "green",
};
