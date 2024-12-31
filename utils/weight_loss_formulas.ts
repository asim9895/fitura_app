import { ActivityFactor, Gender, WeightLossIntensity } from "@/types";

export const goal_achievement_date = (
  current_weight: number,
  target_weight: number,
  intensity: WeightLossIntensity
) => {
  const weight_to_loose = current_weight - target_weight;
  const weeks_to_goal_value = weight_to_loose / intensity;
  const today = new Date();
  const goal_achievement_date = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + weeks_to_goal_value * 7
  );

  return {
    goal_achievement_date,
    weight_to_loose,
    weeks_to_goal_value,
  };
};

export interface CaloriesCount {
  bmi: string;
  maintainance_calories: string;
  calories_to_loose_weight: string;
  daily_deficiet: string;
}

export const calories_count_data = (
  current_weight: number,
  intensity: WeightLossIntensity,
  height: number,
  activity_factor: ActivityFactor,
  age: number,
  gender: Gender
): CaloriesCount => {
  const bmi = (current_weight / (height / 100) ** 2).toFixed(2);
  const bmr =
    gender === "Male"
      ? 10 * current_weight + 6.25 * height - 5 * age + 5
      : 10 * current_weight + 6.25 * height - 5 * age - 161;

  const activity =
    activity_factor === "sedentary"
      ? 1.2
      : activity_factor === "light"
      ? 1.375
      : activity_factor === "moderate"
      ? 1.55
      : activity_factor === "very active"
      ? 1.725
      : 1.9;

  const maintainance_calories = bmr * activity;

  const weekly_deficiet = intensity * 7700;
  const daily_deficiet = weekly_deficiet / 7;
  const calories_to_loose_weight = maintainance_calories - daily_deficiet;
  return {
    bmi,
    maintainance_calories: maintainance_calories.toFixed(0),
    calories_to_loose_weight: calories_to_loose_weight.toFixed(0),
    daily_deficiet: daily_deficiet.toFixed(0),
  };
};
