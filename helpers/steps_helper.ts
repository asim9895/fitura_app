import { SingleStepEntry, StepData } from "@/types";
import { calculateCaloriesBurned } from "@/utils/count_step_calories";
import { average_pace, avergae_step_frequency } from "@/utils/variables";
import { isSameDay } from "date-fns";

const average_step_frequency_for_day = (
  all_steps_data: StepData[],
  steps_data: SingleStepEntry[],
  selected_date: Date
) => {
  const average_step_frequency =
    all_steps_data?.length === 0 || all_steps_data === undefined
      ? 0
      : all_steps_data
          ?.filter((data: StepData) => {
            const date = new Date(data.date);
            return isSameDay(date, selected_date);
          })
          ?.reduce(
            (total, step) =>
              total +
              step.data.reduce((total, step) => total + step.step_frequency, 0),
            0
          ) / steps_data.length;
  return Number.isNaN(average_step_frequency) ? 0 : average_step_frequency;
};

const average_pace_for_day = (
  all_steps_data: StepData[],
  selected_date: Date
) => {
  let average_pace_calculate =
    all_steps_data?.length === 0 || all_steps_data === undefined
      ? average_pace
      : all_steps_data?.filter((data: StepData) => {
          const date = new Date(data.date);
          return isSameDay(date, selected_date);
        })[0]?.data[0]?.pace;
  return average_pace_calculate;
};

export const total_steps_for_day = (
  all_steps_data: StepData[],
  selected_date: Date
) => {
  return all_steps_data?.length === 0 || all_steps_data === undefined
    ? 0
    : all_steps_data
        ?.filter((data: StepData) => {
          const date = new Date(data.date);
          return isSameDay(date, selected_date);
        })
        ?.reduce(
          (total, step) =>
            total + step.data.reduce((total, step) => total + step.steps, 0),
          0
        );
};

export const total_calories_burned_by_steps = (
  weight: number,
  all_steps_data: StepData[],
  steps_data: SingleStepEntry[],
  selected_date: Date,
  total_steps_for_day: number
) => {
  const data = calculateCaloriesBurned({
    weightKg: weight,
    steps: total_steps_for_day,
    stepFrequency: average_step_frequency_for_day(
      all_steps_data,
      steps_data,
      selected_date
    ),
    paceMinSec:
      average_pace_for_day(all_steps_data, selected_date) === undefined
        ? average_pace
        : average_pace_for_day(all_steps_data, selected_date),
  });

  return data;
};
