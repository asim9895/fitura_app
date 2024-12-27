interface StepData {
  id: string;
  date: Date;
  data: {
    id: string;
    steps: number;
    day_time: string;
  }[];
}

export const steps: StepData[] = [
  {
    id: "1",
    date: new Date("2024-12-24T13:42:30.685Z"),
    data: [
      {
        id: "1",
        steps: 4000,
        day_time: "evening cardio",
      },
      {
        id: "2",
        steps: 4000,
        day_time: "wedding",
      },
      {
        id: "3",
        steps: 5000,
        day_time: "hiking",
      },
    ],
  },
  {
    id: "2",
    date: new Date("2024-12-25T13:42:30.685Z"),
    data: [
      {
        id: "1",
        steps: 4000,
        day_time: "morning",
      },
      {
        id: "2",
        steps: 4000,
        day_time: "evening",
      },
      {
        id: "3",
        steps: 3000,
        day_time: "afternoon",
      },
    ],
  },
  {
    id: "3",
    date: new Date("2024-12-27T13:42:30.685Z"),
    data: [
      {
        id: "1",
        steps: 3000,
        day_time: "jogging",
      },
      {
        id: "2",
        steps: 4000,
        day_time: "evening walk",
      },
      {
        id: "3",
        steps: 3000,
        day_time:
          "evening walk evening walkevening walkevening walkevening walkevening walkevening walkevening walkevening walkevening walkevening walk",
      },
    ],
  },
];

export const water_data: StepData[] = [
  {
    id: "1",
    date: new Date("2024-12-22T13:42:30.685Z"),
    data: [
      {
        id: "1",
        steps: 4000,
        day_time: "morning",
      },
      {
        id: "2",
        steps: 4000,
        day_time: "evening",
      },
      {
        id: "3",
        steps: 5000,
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
        steps: 4000,
        day_time: "morning",
      },
      {
        id: "2",
        steps: 4000,
        day_time: "evening",
      },
      {
        id: "3",
        steps: 3000,
        day_time: "afternoon",
      },
    ],
  },
];

export const calorie_data: StepData[] = [
  {
    id: "1",
    date: new Date("2024-12-23T13:42:30.685Z"),
    data: [
      {
        id: "1",
        steps: 4000,
        day_time: "morning",
      },
      {
        id: "2",
        steps: 4000,
        day_time: "evening",
      },
      {
        id: "3",
        steps: 5000,
        day_time: "afternoon",
      },
    ],
  },
  {
    id: "2",
    date: new Date("2024-12-26T13:42:30.685Z"),
    data: [
      {
        id: "1",
        steps: 4000,
        day_time: "morning",
      },
      {
        id: "2",
        steps: 4000,
        day_time: "evening",
      },
      {
        id: "3",
        steps: 3000,
        day_time: "afternoon",
      },
    ],
  },
  {
    id: "2",
    date: new Date("2024-12-24T13:42:30.685Z"),
    data: [
      {
        id: "1",
        steps: 4000,
        day_time: "morning",
      },
      {
        id: "2",
        steps: 4000,
        day_time: "evening",
      },
      {
        id: "3",
        steps: 3000,
        day_time: "afternoon",
      },
    ],
  },
];
