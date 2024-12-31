export type WeightLossIntensity = 0.25 | 0.5 | 0.75 | 1;
export type Route = "calorie" | "water" | "steps";
export type ActivityFactor =
  | "sedentary"
  | "light"
  | "moderate"
  | "active"
  | "very active";

export type Gender = "Male" | "Female";
export type SingleStepEntry = {
  id: string;
  steps: number;
  day_time: string;
  step_frequency: number;
  pace: string;
};
export type ServingUnit = "g" | "ml" | "kg" | "l";

export type DayTime = "Breakfast" | "Lunch" | "Dinner" | "Snack";
export interface StepData {
  id: string;
  date: Date;
  data: SingleStepEntry[];
}

export type SingleWaterEntry = {
  id: string;
  intake: number;
  day_time: string;
};

export interface WaterData {
  id: string;
  date: Date;
  data: SingleWaterEntry[];
}

export type SingleCalorieEatenEntry = {
  id: string;
  name: string;
  calorie: number;
  day_time?: DayTime;
  protein: number;
  carbs: number;
  fat: number;
  note: string;
  serving_size: number;
  serving_unit: ServingUnit;
};
export interface CalorieEatenData {
  id: string;
  date: Date;
  data: SingleCalorieEatenEntry[];
}

export type SingleCalorieBurnedEntry = {
  id: string;
  burned: number;
  activity: string;
  hour: number;
  minutes: number;
};
export interface CalorieBurnedData {
  id: string;
  date: Date;
  data: SingleCalorieBurnedEntry[];
}

export interface WeightData {
  id: string;
  date: Date;
  weight: number;
}
