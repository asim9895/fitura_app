export const count_step_calories = (steps: number, weight: number) => {
  const calories_burned_per_step = 0.0005 * weight * 1.4;

  const counted_calories = calories_burned_per_step * steps;

  return counted_calories?.toFixed(0);
};

interface CalorieCalculationResult {
  totalCalories: number;
  distanceKm: number;
  speedKmh: number;
  timeMinutes: number;
}

export const calculateCaloriesBurned = ({
  weightKg,
  steps,
  stepFrequency,
  paceMinSec,
}: {
  weightKg: number;
  steps: number;
  stepFrequency: number;
  paceMinSec: string;
}): CalorieCalculationResult => {
  // Convert pace to speed
  const [minutes, seconds] = paceMinSec?.split("'").map(Number);
  const totalMinutes = minutes + seconds / 60;
  const speedKmh = 60 / totalMinutes;

  // Calculate time spent walking
  const timeMinutes = steps / stepFrequency;

  // Calculate distance
  const distanceKm = (speedKmh * timeMinutes) / 60;

  // MET value calculation based on speed
  // Walking MET values: 2.0 for <= 2.7 km/h, 2.5 for 2.8-3.3 km/h,
  // 3.0 for 3.4-4.0 km/h, 3.5 for 4.1-4.7 km/h, 4.3 for 4.8-5.5 km/h
  let met: number;
  if (speedKmh <= 2.7) met = 2.0;
  else if (speedKmh <= 3.3) met = 2.5;
  else if (speedKmh <= 4.0) met = 3.0;
  else if (speedKmh <= 4.7) met = 3.5;
  else if (speedKmh <= 5.5) met = 4.3;
  else met = 5.0;

  // Calorie calculation using MET formula
  // Calories = MET * weight in kg * time in hours
  const timeHours = timeMinutes / 60;
  const totalCalories = met * weightKg * timeHours;

  return {
    totalCalories: Number(round(totalCalories).toFixed(0)),
    distanceKm: round(distanceKm),
    speedKmh: round(speedKmh),
    timeMinutes: round(timeMinutes),
  };
};

const round = (num: number): number => {
  return Number(num.toFixed(2));
};

// Test calculation
const result = calculateCaloriesBurned({
  weightKg: 90.55,
  steps: 1883,
  stepFrequency: 88,
  paceMinSec: "13'03",
});
