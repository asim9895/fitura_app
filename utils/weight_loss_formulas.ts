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
  maintainance_calories: number;
  calories_to_loose_weight: number;
}

export const calories_count_data = (
  current_weight: number,
  intensity: WeightLossIntensity,
  height: number,
  activity_factor: ActivityFactor,
  age: number,
  gender: Gender
): CaloriesCount => {
  console.log(current_weight, intensity, height, activity_factor, age, gender);
  const bmi = (current_weight / (height / 100) ** 2).toFixed(2);
  const bmr =
    gender === "Male"
      ? 10 * current_weight + 6.25 * height - 5 * age + 5
      : 10 * current_weight + 6.25 * height - 5 * age - 161;
  console.log("bmr", bmr);

  const maintainance_calories =
    activity_factor === "sedentary"
      ? bmr * 1.2
      : activity_factor === "light"
      ? bmr * 1.375
      : activity_factor === "moderate"
      ? bmr * 1.55
      : activity_factor === "very_active"
      ? bmr * 1.725
      : bmr * 1.9;

  const weekly_deficiet = intensity * 7700;
  const daily_deficiet = weekly_deficiet / 7;
  const calories_to_loose_weight = maintainance_calories - daily_deficiet;
  return {
    bmi,
    maintainance_calories,
    calories_to_loose_weight,
  };
};
