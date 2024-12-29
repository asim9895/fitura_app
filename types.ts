export type SingleStepEntry = {
  id: string;
  steps: number;
  day_time: string;
  step_frequency: number;
  pace: string;
};
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
  eaten: number;
  day_time: string;
  protein: number;
  carbs: number;
  fat: number;
};
export interface CalorieEatenData {
  id: string;
  date: Date;
  data: SingleCalorieEatenEntry[];
}

export type SingleCalorieBurnedEntry = {
  id: string;
  burned: number;
  day_time: string;
  activity: string;
  hour: number;
  minutes: number;
};
export interface CalorieBurnedData {
  id: string;
  date: Date;
  data: SingleCalorieBurnedEntry[];
}
