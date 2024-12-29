import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CalorieCalculationResult {
  totalCalories: number;
  distanceKm: number;
  speedKmh: number;
  timeMinutes: number;
}

const initial_state: CalorieCalculationResult = {
  totalCalories: 0,
  distanceKm: 0,
  speedKmh: 0,
  timeMinutes: 0,
};

const step_slice = createSlice({
  name: "step",
  initialState: initial_state,
  reducers: {
    set_steps_count_data: (
      state,
      action: PayloadAction<CalorieCalculationResult>
    ) => {
      state.totalCalories = action.payload.totalCalories;
      state.distanceKm = action.payload.distanceKm;
      state.speedKmh = action.payload.speedKmh;
      state.timeMinutes = action.payload.timeMinutes;
    },
  },
});

export const { set_steps_count_data } = step_slice.actions;

export default step_slice.reducer;
