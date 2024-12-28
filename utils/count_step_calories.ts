export const count_step_calories = (steps: number, weight: number) => {
  const calories_burned_per_step = 0.0005 * weight * 1.5;

  const counted_calories = calories_burned_per_step * steps;

  return counted_calories?.toFixed(0);
};
