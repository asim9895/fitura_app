import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  name: string;
  gender: string;
  height: string;
  weight: string;
  age: number | null;
  profile_completed: boolean;
  selected_date: string;
  creation_date: string | null;
  target_calorie: number;
  target_steps: number;
  target_water: number;
}

interface UserCreation {
  name: string;
  gender: string;
  height: string;
  weight: string;
  age: number | null;
  profile_completed?: boolean;
  creation_date: string | null;
}

const initial_state: UserState = {
  name: "",
  gender: "",
  height: "",
  weight: "",
  age: null,
  profile_completed: false,
  selected_date: new Date().toISOString().split("T")[0],
  creation_date: null,
  target_calorie: 2400,
  target_steps: 6000,
  target_water: 2000,
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
      state.height = "";
      state.weight = "";
      state.profile_completed = false;
      state.creation_date = null;
    },
    set_selected_date: (
      state,
      action: PayloadAction<{ selected_date: string }>
    ) => {
      state.selected_date = action.payload.selected_date;
    },
  },
});

export const { set_user_profile, clear_user_profile, set_selected_date } =
  user_slice.actions;

export default user_slice.reducer;
