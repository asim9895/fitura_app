import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  name: string;
  gender: string;
  height: number;
  weight: number;
  age: number | null;
  profile_completed: boolean;
  selected_date: Date;
  creation_date: Date | null;
  recommended_target_calorie: number;
  target_calorie: number;
  target_steps: number;
  target_water: number;
}

interface UserCreation {
  name: string;
  gender: string;
  height: number;
  weight: number;
  age: number | null;
  profile_completed?: boolean;
  creation_date: Date;
}

const initial_state: UserState = {
  name: "",
  gender: "",
  height: 0,
  weight: 0,
  age: null,
  profile_completed: false,
  selected_date: new Date(),
  creation_date: null,
  recommended_target_calorie: 0,
  target_calorie: 5000,
  target_steps: 12000,
  target_water: 10000,
};

const user_slice = createSlice({
  name: "user",
  initialState: initial_state,
  reducers: {
    set_user_profile: (state, action: PayloadAction<UserCreation>) => {
      state.name = action.payload.name;
      state.gender = action.payload.gender;
      state.age = action.payload.age;
      state.height = action.payload.height;
      state.weight = action.payload.weight;
      state.profile_completed = true;
      state.creation_date = action.payload.creation_date;
    },
    clear_user_profile: (state) => {
      state.name = "";
      state.gender = "";
      state.age = null;
      state.height = 0;
      state.weight = 0;
      state.profile_completed = false;
      state.creation_date = null;
    },
    set_selected_date: (
      state,
      action: PayloadAction<{ selected_date: Date }>
    ) => {
      state.selected_date = action.payload.selected_date;
    },
    update_steps_target: (
      state,
      action: PayloadAction<{ target_steps: number }>
    ) => {
      state.target_steps = action.payload.target_steps;
    },
  },
});

export const {
  set_user_profile,
  clear_user_profile,
  set_selected_date,
  update_steps_target,
} = user_slice.actions;

export default user_slice.reducer;
