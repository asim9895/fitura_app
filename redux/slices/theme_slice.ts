import { Colors, light } from "@/theme/colors";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Theme = string | null | undefined;

interface ThemeState {
  colors: Colors;
  theme: Theme;
}

const initial_state: ThemeState = {
  colors: light,
  theme: "light",
};

const theme_slice = createSlice({
  name: "theme",
  initialState: initial_state,
  reducers: {
    set_theme: (state, action: PayloadAction<ThemeState>) => {
      state.colors = action.payload.colors;
      state.theme = action.payload.theme;
    },
  },
});

export const { set_theme } = theme_slice.actions;

export default theme_slice.reducer;
