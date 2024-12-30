import {
  CalorieBurnedData,
  CalorieEatenData,
  StepData,
  WaterData,
} from "@/types";

export const water: WaterData[] = [
  {
    id: "1",
    date: new Date("2024-12-28T13:42:30.685Z"),
    data: [
      {
        id: "1",
        intake: 4000,
        day_time: "morning",
      },
      {
        id: "2",
        intake: 4000,
        day_time: "evening",
      },
      {
        id: "3",
        intake: 5000,
        day_time: "afternoon",
      },
    ],
  },
  {
    id: "2",
    date: new Date("2024-12-27T13:42:30.685Z"),
    data: [
      {
        id: "1",
        intake: 4000,
        day_time: "morning",
      },
      {
        id: "2",
        intake: 4000,
        day_time: "evening",
      },
      {
        id: "3",
        intake: 3000,
        day_time: "afternoon",
      },
    ],
  },
];

export const calorie_eaten: CalorieEatenData[] = [
  {
    id: "1",
    date: new Date("2024-12-30T13:42:30.685Z"),
    data: [
      {
        id: "1",
        eaten: 260,
        day_time: "breakfast",
        protein: 100,
        carbs: 200,
        fat: 300,
      },
      {
        id: "2",
        eaten: 656,
        day_time: "lunch",
        protein: 100,
        carbs: 200,
        fat: 300,
      },
      {
        id: "3",
        eaten: 300,
        day_time: "snack",
        protein: 100,
        carbs: 200,
        fat: 300,
      },
      {
        id: "4",
        eaten: 200,
        day_time: "snack",
        protein: 100,
        carbs: 200,
        fat: 300,
      },
    ],
  },
  {
    id: "2",
    date: new Date("2024-12-26T13:42:30.685Z"),
    data: [
      {
        id: "1",
        eaten: 400,
        day_time: "morning",
        protein: 100,
        carbs: 200,
        fat: 300,
      },
      {
        id: "2",
        eaten: 400,
        day_time: "evening",
        protein: 100,
        carbs: 200,
        fat: 300,
      },
      {
        id: "3",
        eaten: 300,
        day_time: "afternoon",
        protein: 100,
        carbs: 200,
        fat: 300,
      },
    ],
  },
  {
    id: "3",
    date: new Date("2024-12-24T13:42:30.685Z"),
    data: [
      {
        id: "1",
        eaten: 400,
        day_time: "morning",
        protein: 100,
        carbs: 200,
        fat: 300,
      },
      {
        id: "2",
        eaten: 400,
        day_time: "evening",
        protein: 100,
        carbs: 200,
        fat: 300,
      },
      {
        id: "3",
        eaten: 300,
        day_time: "afternoon",
        protein: 100,
        carbs: 200,
        fat: 300,
      },
    ],
  },
];

export const calorie_burned: CalorieBurnedData[] = [
  {
    id: "1",
    date: new Date("2024-12-30T13:42:30.685Z"),
    data: [
      {
        id: "1",
        burned: 150,
        day_time: "morning",
        activity: "abs workout",
        hour: 1,
        minutes: 30,
      },
      {
        id: "2",
        burned: 325,
        day_time: "evening",
        activity: "gym",
        hour: 1,
        minutes: 30,
      },
    ],
  },
];
