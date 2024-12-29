import { Gender, WeightLossIntensity } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  name: string;
  gender: Gender;
  height: number;
  weight: number;
  target_weight: number;
  age: number;
  profile_completed: boolean;
  selected_date: Date;
  creation_date: Date | null;
  recommended_target_calorie: number;
  target_calorie: number;
  target_steps: number;
  target_water: number;
  weight_loss_intensity: WeightLossIntensity;
}

interface UserCreation {
  name: string;
  gender: Gender;
  height: number;
  weight: number;
  target_weight: number;
  age: number;
  profile_completed?: boolean;
  creation_date: Date;
  weight_loss_intensity: WeightLossIntensity;
}

const initial_state: UserState = {
  name: "",
  gender: "Male",
  height: 0,
  weight: 0,
  target_weight: 0,
  age: 0,
  weight_loss_intensity: 0.25,
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
      state.weight_loss_intensity = action.payload.weight_loss_intensity;
      state.target_weight = action.payload.target_weight;
    },
    clear_user_profile: (state) => {
      state.name = "";
      state.gender = "Male";
      state.age = 0;
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
    update_weight: (state, action: PayloadAction<{ weight: number }>) => {
      state.weight = action.payload.weight;
    },
  },
});

export const {
  set_user_profile,
  clear_user_profile,
  set_selected_date,
  update_steps_target,
  update_weight,
} = user_slice.actions;

export default user_slice.reducer;
